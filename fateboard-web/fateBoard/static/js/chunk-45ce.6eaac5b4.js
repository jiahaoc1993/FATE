(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-45ce"],{"+2Yw":function(t,e,n){(t.exports=n("I1BE")(!1)).push([t.i,".details-container {\n  height: 100%;\n  padding: 25px 5vw;\n  overflow: auto;\n}\n.details-container .top {\n    padding-bottom: 5px;\n    margin-bottom: 20px;\n    line-height: 25px;\n    border-bottom: 1px solid;\n}\n.details-container .top .link {\n      color: #409eff;\n}\n.details-container .section-wrapper {\n    padding-top: 20px;\n}\n.details-container .section-wrapper .section-title {\n      margin-bottom: 5px;\n}\n.details-container .section-wrapper .section-view {\n      padding: 20px 50px;\n      background: #fff;\n}\n.details-container .section-wrapper .section-view .echart {\n        width: 80vw;\n        height: 500px;\n}\n.details-container .section-wrapper .job-summary {\n      height: 257px;\n}\n.details-container .section-wrapper .job-summary .guest-row .el-col {\n        margin-bottom: 5px;\n}\n.details-container .section-wrapper .job-summary .guest-row .el-col:nth-child(odd) {\n          text-indent: 20px;\n}\n.details-container .section-wrapper .job-summary .section-row {\n        margin-bottom: 10px;\n}\n.details-container .section-wrapper .output-wrapper {\n      height: 400px;\n      width: 50%;\n      padding: 0 20px;\n}\n.details-container .section-wrapper .output-wrapper:nth-child(1) {\n        border-right: 1px solid #999;\n}\n.details-container .section-wrapper .output-wrapper .echarts {\n        height: 100%;\n}\n.details-container .section-wrapper .output-wrapper .msg .msg-title {\n        margin-right: 20px;\n}\n",""])},"7Qib":function(t,e,n){"use strict";n.d(e,"b",function(){return s}),n.d(e,"a",function(){return o});n("jWXv"),n("rfXi"),n("gDS+"),n("GQeE");var a=n("EJiy"),i=n.n(a);function s(t,e){if(0===arguments.length)return null;var n=e||"{y}-{m}-{d} {h}:{i}:{s}",a=void 0;"object"===(void 0===t?"undefined":i()(t))?a=t:("string"==typeof t&&/^[0-9]+$/.test(t)&&(t=parseInt(t)),"number"==typeof t&&10===t.toString().length&&(t*=1e3),a=new Date(t));var s={y:a.getFullYear(),m:a.getMonth()+1,d:a.getDate(),h:a.getHours(),i:a.getMinutes(),s:a.getSeconds(),a:a.getDay()};return n.replace(/{(y|m|d|h|i|s|a)+}/g,function(t,e){var n=s[e];return"a"===e?["日","一","二","三","四","五","六"][n]:(t.length>0&&n<10&&(n="0"+n),n||0)})}function o(t){var e=Math.floor(t/3600),n=Math.floor(t/60%60),a=Math.floor(t%60),i=function(t){return t<1?"00":t<10?"0"+t:t.toString()};return(e=i(e))+":"+(n=i(n))+":"+(a=i(a))}},"7z+L":function(t,e,n){var a=n("gYtT");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n("SZ7m").default)("12b0fd0e",a,!0,{})},BSnc:function(t,e,n){var a=n("+2Yw");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n("SZ7m").default)("86c5fd5e",a,!0,{})},Bw9L:function(t,e,n){"use strict";var a=n("BSnc");n.n(a).a},TJnn:function(t,e,n){"use strict";var a=n("7z+L");n.n(a).a},Yulh:function(t,e,n){"use strict";var a=n("MT78"),i=n.n(a),s={props:{className:{type:String,default:""},id:{type:String,default:""},options:{type:Object,default:function(){return null}}},data:function(){return{echarts:i.a,echartInstance:null}},mounted:function(){this.initChart()},beforeDestroy:function(){this.echartInstance&&(this.echartInstance.dispose(),this.echartInstance=null,window.removeEventListener("resize",this.resize))},methods:{initChart:function(){this.echartInstance=this.echarts.init(this.$refs.myEchart),window.addEventListener("resize",this.resize),this.$emit("getEchartInstance",this.echartInstance),this.$emit("getEchart",this.echarts),this.echartInstance.setOption(this.options)},resize:function(){this.echartInstance.resize()}}},o=(n("TJnn"),n("KHd+")),r=Object(o.a)(s,function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"myEchart",class:this.className,attrs:{id:this.id}})},[],!1,null,null,null);r.options.__file="index.vue";e.a=r.exports},bZCS:function(t,e,n){"use strict";e.a=function(t){for(var e=(t=t||{dependencies:{node2:["node1"],node3:["node2"],node4:["node2"],node5:["node3","node4"],node6:["node5"]},components_list:["node1","node2","node3","node4","node5","node6"]}).dependencies,n=t.components_list,a=0,i=0,s=[],o=[],r=[],l=function(t){var l=e[n[t]];if(l){for(var c=0;c<l.length;c++)r.push({target:t,source:n.indexOf(l[c])});var u=null;o.forEach(function(t){t.name===l[0]&&(u=t)}),a<=u.level?(++a,s.push(i),i=1):++i,t===n.length-1&&s.push(i)}else++i;o.push({name:n[t],level:a,index:i})},c=0;c<n.length;c++)l(c);var u=Math.max.apply(Math,s),p=10*(u-1);return o.map(function(t){var e=s[t.level],n=0;n=e===u?10*(t.index-1):p/(e+1)*t.index,t.x=n,t.y=10*t.level}),{dataList:o,linksList:r}}},dv4G:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s}),n.d(e,"g",function(){return o}),n.d(e,"e",function(){return r}),n.d(e,"d",function(){return l}),n.d(e,"c",function(){return c}),n.d(e,"f",function(){return u}),n.d(e,"h",function(){return p});var a=n("t3Un");function i(t){return Object(a.a)({url:"/job/query/all",method:"get",params:t})}function s(t){return Object(a.a)({url:"/job/query/status",method:"get",params:t})}function o(t){return Object(a.a)({url:"/job/v1/pipeline/job/stop",method:"post",data:{job_id:t}})}function r(t){return Object(a.a)({url:"/job/query/"+t,method:"get"})}function l(t){return Object(a.a)({url:"/v1/pipeline/dag/dependencies",method:"post",data:{job_id:t}})}function c(t){return Object(a.a)({url:"/v1/tracking/component/parameters",method:"post",data:t})}function u(t){return Object(a.a)({url:"/v1/tracking/component/output/model",method:"post",data:t})}function p(t){var e=t.componentId,n=t.jobId,i=t.begin,s=t.end;return Object(a.a)({url:"/queryLogWithSize/"+e+"/"+n+"/"+i+"/"+s+"  ",method:"get"})}},gYtT:function(t,e,n){(t.exports=n("I1BE")(!1)).push([t.i,"\n.default-echart {\n  width: 75vw;\n  height: 75vh;\n}\n",""])},lAiS:function(t,e,n){"use strict";e.a={tooltip:{},series:[{type:"graph",layout:"none",roam:!1,label:{show:!0,color:"#333",borderWidth:1,borderRadius:2,borderColor:"#333",padding:5,lineHeight:20,rich:{a:{color:"red",lineHeight:10},x:{fontSize:18,fontFamily:"Microsoft YaHei",borderColor:"#449933",borderRadius:4}}},symbol:"rect",symbolSize:[50,20],edgeSymbol:["circle","arrow"],edgeSymbolSize:[4,10],edgeLabel:{normal:{textStyle:{fontSize:20}}},data:[],links:[],itemStyle:{color:"#fff"},lineStyle:{normal:{opacity:.9,width:2,curveness:0}}}]}},"nr+k":function(t,e,n){"use strict";n.r(e);var a=n("GQeE"),i=n.n(a),s=n("7Qib"),o=n("dv4G"),r=n("Yulh"),l=n("bZCS"),c=n("lAiS"),u={tooltip:{trigger:"item",triggerOn:"mousemove"},series:[{type:"tree",data:[{name:"test",children:[{name:"child1",children:[{name:"child1-1"},{name:"child1-2"}]},{name:"child2",children:[{name:"child2-1"},{name:"child2-2"},{name:"child2-3"}]}]}],left:"2%",right:"2%",top:"8%",bottom:"20%",symbol:"emptyCircle",symbolSize:[100,25],orient:"vertical",expandAndCollapse:!0,label:{normal:{position:"inside",verticalAlign:"middle",fontSize:12}},itemStyle:{},leaves:{label:{}},animationDurationUpdate:750}]},p={title:{text:"折线图标题",subtext:"折线图副标题"},color:["#3398DB","#D22123","#20D252","#1022F0","#A21155"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value"}],series:[{name:"testName",type:"line",smooth:!0,symbol:"none",data:[23,42,200,100,170,130,500]}]},d=[.15,.3,.42,.54,.61,.65,.85],h={tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},yAxis:[{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],axisTick:{show:!1},axisLine:{show:!1},splitLine:{show:!1}}],xAxis:[{type:"value",axisTick:{show:!1},axisLine:{show:!1},axisLabel:{show:!1},splitLine:{show:!1},max:1}],series:[{type:"bar",barWidth:"20%",barGap:"-100%",itemStyle:{color:"#aaa"},data:[1,1,1,1,1,1,1],label:{show:!0,position:"right",formatter:function(t){return d[t.dataIndex]}},tooltip:{show:!1}},{name:"value",type:"bar",barWidth:"20%",data:d}]},v={name:"Job",components:{EchartContainer:r.a},data:function(){return{jobId:this.$route.query.jobId,jobFrom:this.$route.query.from,status:"complete",summaryLoading:!0,msgLoading:!1,paraList:[],outputList:[],guest:{},jobInfo:{},graphOptions:c.a,treeOptions:u,outputGraphOptions:c.a,lineOptions:p,doubleBarOptions:h,paraLoading:!1,DAGData:null,testDataOutput:[]}},mounted:function(){var t=this;this.getDatasetInfo(),Object(o.d)(this.jobId).then(function(e){t.DAGData=e.data});for(var e=0;e<7;e++)this.testDataOutput.push({v1:e,v2:e,v3:e,v4:e,v5:e,v6:e,v7:e})},methods:{getDatasetInfo:function(){var t=this;Object(o.e)(this.jobId).then(function(e){t.summaryLoading=!1;var n=e.data,a=n.job,i=n.dataset;t.guest={dataset:i.dataset,target:i.target,rows:i.row,column:i.column,partner:i.partner,pnr_dataset:i.pnr_dataset},t.jobInfo={submmissionTime:Object(s.b)(new Date(a.fCreateTime)),startTime:Object(s.b)(new Date(a.fStartTime)),endTime:Object(s.b)(new Date(a.fEndTime)),duration:Object(s.a)(3800)}})},getGraphEchartInstance:function(t){var e=this,n=null;n=window.setInterval(function(){if(e.DAGData){window.clearInterval(n);var a=Object(l.a)(e.DAGData),i=a.dataList,s=a.linksList;e.graphOptions.series[0].data=i,e.graphOptions.series[0].links=s,t.setOption(e.graphOptions,!0),t.on("click",{dataType:"node"},function(t){e.clickComponent(t.name)})}},100)},clickComponent:function(t){this.paraLoading=!0,this.getParams(t),this.getModelOutput(t)},getParams:function(t){var e=this;Object(o.c)({job_id:this.jobId,componet_name:t}).then(function(t){e.paraLoading=!1,e.paraList=i()(t.data)})},getModelOutput:function(t){var e=this;Object(o.f)({job_id:this.jobId,componet_name:t}).then(function(t){e.outputList=i()(t.data)})},getLineEchartInstance:function(t){},getDoubleBarEchartInstance:function(t){},getTreeEchartInstance:function(t){}}},m=(n("Bw9L"),n("KHd+")),g=Object(m.a)(v,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"details-container bg-dark"},[n("div",{staticClass:"top"},[n("p",[n("router-link",{staticClass:"link",attrs:{to:{path:"/dashboard",query:{jobId:t.jobId}}}},[t._v(t._s(t.jobFrom))]),t._v("\n      > "+t._s(t.jobId)+"\n    ")],1)]),t._v(" "),n("div",{staticClass:"flex flex-end"},[n("el-button",{on:{click:function(e){t.$router.push({path:"/dashboard",query:{jobId:t.jobId}})}}},[t._v("dashboard")])],1),t._v(" "),n("section",{staticClass:"section-wrapper"},[n("h3",{staticClass:"section-title"},[t._v("Job summary")]),t._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.summaryLoading,expression:"summaryLoading"}],staticClass:"section-view job-summary"},[n("el-row",{staticClass:"section-row"},[n("el-col",{attrs:{span:12}},[t._v("Job ID: "+t._s(t.jobId))]),t._v(" "),n("el-col",{attrs:{span:12}},[t._v("Status: "+t._s(t.status))])],1),t._v(" "),n("ul",{staticStyle:{"margin-bottom":"10px"}},[n("li",[n("h3",{staticStyle:{"margin-bottom":"5px"}},[t._v("GUEST")]),t._v(" "),n("el-row",{staticClass:"guest-row"},[t.guest.dataset?n("el-col",{attrs:{span:12}},[t._v("Dataset: "+t._s(t.guest.dataset))]):t._e(),t._v(" "),t.guest.target?n("el-col",{attrs:{span:12}},[t._v("Target: "+t._s(t.guest.target))]):t._e()],1),t._v(" "),n("el-row",{staticClass:"guest-row"},[t.guest.column?n("el-col",{attrs:{span:12}},[t._v("Column: "+t._s(t.guest.column))]):t._e(),t._v(" "),t.guest.rows?n("el-col",{attrs:{span:12}},[t._v("Rows: "+t._s(t.guest.rows))]):t._e()],1)],1),t._v(" "),n("li",[n("h3",{staticStyle:{"margin-bottom":"5px"}},[t._v("GUEST")]),t._v(" "),n("el-row",{staticClass:"guest-row"},[t.guest.partner?n("el-col",{attrs:{span:12}},[t._v("Partner: "+t._s(t.guest.partner))]):t._e(),t._v(" "),t.guest.pnr_dataset?n("el-col",{attrs:{span:12}},[t._v("PNR-dataset"+t._s(t.guest.pnr_dataset))]):t._e()],1)],1)]),t._v(" "),n("el-row",{staticClass:"section-row"},[n("el-col",{attrs:{span:12}},[t._v("Submmision time: "+t._s(t.jobInfo.submmissionTime))]),t._v(" "),n("el-col",{attrs:{span:12}},[t._v("Start time: "+t._s(t.jobInfo.startTime))])],1),t._v(" "),n("el-row",{staticClass:"section-row"},[n("el-col",{attrs:{span:12}},[t._v("End time: "+t._s(t.jobInfo.endTime))]),t._v(" "),n("el-col",{attrs:{span:12}},[t._v("Duration: "+t._s(t.jobInfo.duration))])],1)],1)]),t._v(" "),n("section",{staticClass:"section-wrapper"},[n("h3",{staticClass:"section-title"},[t._v("Model summary")]),t._v(" "),n("div",{staticClass:"section-view flex"},[n("div",[n("p",[t._v("Job ID:"+t._s(t.jobId))])])])]),t._v(" "),n("section",{staticClass:"section-wrapper"},[n("h3",{staticClass:"section-title"},[t._v("Outputs from job")]),t._v(" "),n("div",{staticClass:"section-view flex"},[n("div",{staticClass:"output-wrapper"},[t._m(0),t._v(" "),n("echart-container",{class:"echarts",attrs:{options:t.graphOptions},on:{getEchartInstance:t.getGraphEchartInstance}})],1),t._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.paraLoading,expression:"paraLoading"}],staticClass:"output-wrapper"},[n("h4",{staticClass:"output-title"},[t._v("statistics")]),t._v(" "),n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.msgLoading,expression:"msgLoading"}],staticClass:"msg"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.paraList.length>0,expression:"paraList.length>0"}],staticClass:"flex"},[n("h4",{staticClass:"msg-title"},[t._v("Parameters("+t._s(t.paraList.length)+")")]),t._v(" "),n("ul",{staticClass:"para-list"},t._l(t.paraList,function(e,a){return n("li",{key:a},[t._v(t._s(e))])}))]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.outputList.length>0,expression:"outputList.length>0"}],staticClass:"flex"},[n("h4",{staticClass:"msg-title"},[t._v("Outputs("+t._s(t.outputList.length)+")")]),t._v(" "),n("ul",{staticClass:"para-list"},t._l(t.paraList,function(e,a){return n("li",{key:a},[t._v(t._s(e))])}))])])])])]),t._v(" "),n("section",{staticClass:"section-wrapper"},[n("h3",{staticClass:"section-title"},[t._v("Visualization")]),t._v(" "),n("div",{staticClass:"section-view flex"},[n("el-tabs",{staticStyle:{width:"100%"},attrs:{type:"border-card"}},[n("el-tab-pane",[n("span",{attrs:{slot:"label"},slot:"label"},[t._v("Model_output")]),t._v(" "),n("echart-container",{class:"echart",attrs:{options:t.treeOptions},on:{getEchartInstance:t.getTreeEchartInstance}}),t._v(" "),n("echart-container",{class:"echart",attrs:{options:t.lineOptions},on:{getEchartInstance:t.getLineEchartInstance}}),t._v(" "),n("echart-container",{class:"echart",attrs:{options:t.doubleBarOptions},on:{getEchartInstance:t.getDoubleBarEchartInstance}})],1),t._v(" "),n("el-tab-pane",[n("span",{attrs:{slot:"label"},slot:"label"},[t._v("Data_output")]),t._v(" "),n("el-table",{attrs:{data:t.testDataOutput,"highlight-current-row":"",height:"500px",border:""}},[n("el-table-column",{attrs:{type:"index",label:"index",width:"100px",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"v1",prop:"v1",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"v2",prop:"v2",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"v3",prop:"v3",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"v4",prop:"v4",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"v5",prop:"v5",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"v6",prop:"v6",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"v7",prop:"v7",align:"center"}})],1)],1),t._v(" "),n("el-tab-pane",[n("span",{attrs:{slot:"label"},slot:"label"},[t._v("Log")]),t._v("\n          Log\n        ")])],1)],1)])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{staticClass:"output-title"},[this._v("main graph"),e("span",[this._v("Click component to view details")])])}],!1,null,null,null);g.options.__file="index.vue";e.default=g.exports}}]);