#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
#  Copyright 2019 The FATE Authors. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

import copy
import functools
import time

from federatedml.framework.homo.procedure import aggregator
from federatedml.linear_model.linear_model_weight import LinearModelWeights as LogisticRegressionWeights
from federatedml.linear_model.logistic_regression.homo_logsitic_regression.homo_lr_base import HomoLRBase
from federatedml.model_selection import MiniBatch
from federatedml.optim import activation
from federatedml.optim.gradient.homo_lr_gradient import LogisticGradient
from federatedml.util import LOGGER
from federatedml.util import consts
from federatedml.util import fate_operator
from federatedml.util.fate_operator import vec_dot
from federatedml.util.io_check import assert_io_num_rows_equal


class HomoLRGuest(HomoLRBase):
    def __init__(self):
        super(HomoLRGuest, self).__init__()
        self.gradient_operator = LogisticGradient()
        self.loss_history = []
        self.role = consts.GUEST
        self.aggregator = aggregator.Guest()

    def _init_model(self, params):
        super()._init_model(params)

    def fit(self, data_instances, validate_data=None):
        self._abnormal_detection(data_instances)
        self.check_abnormal_values(data_instances)
        self.init_schema(data_instances)

        self._client_check_data(data_instances)
        validation_strategy = self.init_validation_strategy(
            data_instances, validate_data)
        self.model_weights = self._init_model_variables(data_instances)

        max_iter = self.max_iter
        # total_data_num = data_instances.count()
        mini_batch_obj = MiniBatch(
            data_inst=data_instances, batch_size=self.batch_size)
        model_weights = self.model_weights

        degree = 0
        self.prev_round_weights = copy.deepcopy(model_weights)

        wasted_time = 0.0
        start_time = time.time()
        while self.n_iter_ < max_iter + 1:
            batch_data_generator = mini_batch_obj.mini_batch_data_generator()

            self.optimizer.set_iters(self.n_iter_)
            if ((self.n_iter_ + 1) % self.aggregate_iters == 0) or self.n_iter_ == max_iter:
                aggregation_start_time = time.time()
                LOGGER.debug("start aggregation")
                weight = self.aggregator.aggregate_then_get(model_weights, degree=degree,
                                                            suffix=self.n_iter_)

                self.model_weights = LogisticRegressionWeights(
                    weight.unboxed, self.fit_intercept)

                # store prev_round_weights after aggregation
                self.prev_round_weights = copy.deepcopy(self.model_weights)
                # send loss to arbiter
                loss = self._compute_loss(
                    data_instances, self.prev_round_weights)
                self.aggregator.send_loss(
                    loss, degree=degree, suffix=(self.n_iter_,))
                degree = 0

                self.is_converged = self.aggregator.get_converge_status(
                    suffix=(self.n_iter_,))
                LOGGER.info("n_iters: {}, loss: {} converge flag is :{}".format(
                    self.n_iter_, loss, self.is_converged))

                aggregation_end_time = time.time()
                LOGGER.debug("end aggregation after %.3f seconds",
                             aggregation_end_time-aggregation_start_time)
                wasted_time += aggregation_end_time-aggregation_start_time

                if self.is_converged or self.n_iter_ == max_iter:
                    break
                model_weights = self.model_weights
                
            batch_num = 0
            for batch_data in batch_data_generator:
                n = batch_data.count()
                # LOGGER.debug("In each batch, lr_weight: {}, batch_data count: {}".format(model_weights.unboxed, n))
                f = functools.partial(self.gradient_operator.compute_gradient,
                                      coef=model_weights.coef_,
                                      intercept=model_weights.intercept_,
                                      fit_intercept=self.fit_intercept)
                grad = batch_data.applyPartitions(
                    f).reduce(fate_operator.reduce_add)
                grad /= n
                # LOGGER.debug('iter: {}, batch_index: {}, grad: {}, n: {}'.format(
                #     self.n_iter_, batch_num, grad, n))

                if self.use_proximal:  # use proximal term
                    model_weights = self.optimizer.update_model(model_weights, grad=grad,
                                                                has_applied=False,
                                                                prev_round_weights=self.prev_round_weights)
                else:
                    model_weights = self.optimizer.update_model(model_weights, grad=grad,
                                                                has_applied=False)

                batch_num += 1
                degree += n

            validation_strategy.validate(self, self.n_iter_)
            self.n_iter_ += 1
        end_time = time.time()
        LOGGER.debug(
            "spent %.3f secnods to finished the all iterations", end_time - start_time)
        LOGGER.debug(
            "spent %.3f seconds for aggregation, wasted time protion is %.3f %%", wasted_time, wasted_time /
            (end_time - start_time) * 100.0
        )

        self.set_summary(self.get_model_summary())

    @assert_io_num_rows_equal
    def predict(self, data_instances):

        self._abnormal_detection(data_instances)
        self.init_schema(data_instances)

        data_instances = self.align_data_header(data_instances, self.header)
        # predict_wx = self.compute_wx(data_instances, self.model_weights.coef_, self.model_weights.intercept_)
        pred_prob = data_instances.mapValues(lambda v: activation.sigmoid(vec_dot(v.features, self.model_weights.coef_)
                                                                          + self.model_weights.intercept_))

        predict_result = self.predict_score_to_output(data_instances, pred_prob, classes=[0, 1],
                                                      threshold=self.model_param.predict_param.threshold)

        return predict_result
