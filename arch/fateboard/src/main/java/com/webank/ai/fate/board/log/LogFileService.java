package com.webank.ai.fate.board.log;

import com.alibaba.fastjson.JSON;
import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.Session;
import com.webank.ai.fate.board.dao.TaskMapper;
import com.webank.ai.fate.board.pojo.JobWithBLOBs;
import com.webank.ai.fate.board.pojo.SshInfo;
import com.webank.ai.fate.board.pojo.Task;
import com.webank.ai.fate.board.pojo.TaskExample;
import com.webank.ai.fate.board.services.JobManagerService;
import com.webank.ai.fate.board.ssh.SshService;
import com.webank.ai.fate.board.utils.Dict;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;


@Service
public class LogFileService {


    String JOB_LOG_PATH = "$job_id/$role/$party_id/$file_name";
    final static String TASK_LOG_PATH = "$job_id/$role/$party_id/$component_id/$file_name";
    final static String DEFAULT_FILE_NAME = "DEBUG.log";

    final static String DEFAULT_COMPONENT_ID = "default";
    final static String DEFAULT_LOG_TYPE = "default";

    @Value("${FATE_DEPLOY_PREFIX:/data/projects/fate/python/logs/}")
    String FATE_DEPLOY_PREFIX = "/data/projects/fate/python/logs/";

    @Autowired
    SshService sshService;
    @Autowired
    private JobManagerService jobManagerService;

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;
    @Autowired
    private TaskMapper taskMapper;
    Logger logger = LoggerFactory.getLogger(LogFileService.class);

    public static String toJsonString(String content,
                                      long bytesize,
                                      long lineNum
    ) {
        Map logInfo = Maps.newHashMap();
        logInfo.put(Dict.LOG_CONTENT, content);
        logInfo.put(Dict.LOG_LINE_NUM, lineNum);
        return JSON.toJSONString(logInfo);
    }

    public static Map toLogMap(String content, long lineNum) {
        Map logInfo = Maps.newHashMap();
        logInfo.put(Dict.LOG_CONTENT, content);
        logInfo.put(Dict.LOG_LINE_NUM, lineNum);
        return logInfo;
    }


    public static int getLocalFileLineCount(File file) throws IOException {
        LineNumberReader lnr = new LineNumberReader(new FileReader(file));
        lnr.skip(Long.MAX_VALUE);
        int lineNo = lnr.getLineNumber();
        lnr.close();
        return lineNo;
    }

    public static boolean checkFileIsExist(String filePath) {

        File file = new File(filePath);
        return file.exists();
    }

    public String getJobDir(String jobId) {
        return FATE_DEPLOY_PREFIX + jobId + "/";
    }



    public String buildFilePath(String jobId, String componentId, String type,String  role,String partyId) {

      //  JobWithBLOBs  jobWithBLOBs =  jobManagerService.queryJobByFJobId(jobId);

        Preconditions.checkArgument(StringUtils.isNoneEmpty(jobId,componentId,type,role,partyId));

//        String  role =jobWithBLOBs.getfRole();
//
//        String  partyId = jobWithBLOBs.getfPartyId();

        String filePath = "";
        if (componentId == null || (componentId != null && componentId.equals(DEFAULT_COMPONENT_ID))) {

            filePath = JOB_LOG_PATH.replace("$job_id", jobId).replace("$role",role).replace("$party_id",partyId);


        } else {
            filePath = TASK_LOG_PATH.replace("$job_id", jobId).replace("$component_id", componentId).replace("$role",role).replace("$party_id",partyId);
        }

        if (type.equals(DEFAULT_LOG_TYPE)) {
            filePath = filePath.replace("$file_name", DEFAULT_FILE_NAME);
        } else {

            switch(type){
                case  "error":       filePath = filePath.replace("$file_name", "ERROR.log");  break;
                case  "debug":       filePath = filePath.replace("$file_name", "DEBUG.log");  break;
                case   "info":          filePath = filePath.replace("$file_name", "INFO.log");  break;

                default:   filePath = filePath.replace("$file_name", "INFO.log");

            }

        }

        String  result = FATE_DEPLOY_PREFIX + filePath;
        logger.info("build filePath result {}", result);
        return result;
         // return "/data/project/fdn/nginx/logs/access.log";
//        SimpleDateFormat  simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
//         Date  date  = new Date();
//
//         String  temp =  simpleDateFormat.format(date);
//          return  "/data/projects/fateboard/bin/logs/"+temp+"/httpclient.0.log";
    }

    public Integer getRemoteFileLineCount(SshInfo sshInfo, String logFilePath) throws Exception {
        Preconditions.checkArgument(sshInfo!=null&&logFilePath!=null&&!"".equals(logFilePath));
        Channel wcChannel = null;
        BufferedReader reader = null;
        String lineString= null;
        Session session = sshService.connect(sshInfo);
        wcChannel = sshService.executeCmd(session, "wc -l " + logFilePath + "| awk '{print $1}'");
        try {
            InputStream in = wcChannel.getInputStream();
             reader = new BufferedReader(new InputStreamReader(in));
             lineString = reader.readLine();
            }finally{
            if(wcChannel!=null) {
                wcChannel.disconnect();
            }
            if(reader!=null) {
                reader.close();
            }
        }
        Preconditions.checkArgument(lineString == null, "file " + logFilePath + "is not exist in " + sshInfo.getIp());

        return new Integer(lineString);

    }


    public List<Map> getRemoteLogWithFixSize(String jobId, String componentId, String type,String role,String partyId, int begin, int count) throws Exception {
        List<Map> results = Lists.newArrayList();
        JobTaskInfo jobTaskInfo = this.getJobTaskInfo(jobId, componentId,role,partyId);
        SshInfo sshInfo = this.sshService.getSSHInfo(jobTaskInfo.ip);
        String filePath = this.buildFilePath(jobId, componentId, type,role,partyId);
        Session session = this.sshService.connect(sshInfo);
        Channel channel = this.sshService.executeCmd(session, "tail -n +" + begin + " " + filePath + " | head -n " + count);

        InputStream inputStream = channel.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        try {

            String content = null;
            int index = 0;
            do {
                content = reader.readLine();
                if (content != null) {
                    results.add(LogFileService.toLogMap(content, begin + index));
                }
                index++;

            } while (content != null);
        }finally {
            if(channel!=null) {
                channel.disconnect();
            }

        }
        return results;
    }


    public Channel getRemoteLogStream(String jobId, String componentId,String role,String partyId ,String cmd) throws Exception {

        JobTaskInfo jobTaskInfo = this.getJobTaskInfo(jobId, componentId,role,partyId);
        Preconditions.checkArgument(StringUtils.isNotEmpty(jobTaskInfo.ip ), "remote ip is null");
        SshInfo sshInfo = this.sshService.getSSHInfo(jobTaskInfo.ip);
        return getRemoteLogStream(sshInfo, cmd);

    }

    public Channel getRemoteLogStream(SshInfo sshInfo, String cmd) throws Exception {

        Preconditions.checkArgument(sshInfo != null, "remote ssh info is null");
        Preconditions.checkArgument(cmd != null);
        Session session = this.sshService.connect(sshInfo);
        Channel channel = this.sshService.executeCmd(session, cmd);
        return channel;

    }


    public Channel getRemoteLogStream(String jobId, String componentId, String type,String role,String partyId, int endNum) throws Exception {
        String filePath = this.buildFilePath(jobId, componentId, type,role,partyId);
        String cmd = this.buildCommand(endNum, filePath);
        Channel channel = getRemoteLogStream(jobId, componentId,role,partyId, cmd);
        return channel;
    }



    public String buildCommand(int endNum, String filePath) {
        Preconditions.checkArgument(filePath != null && !filePath.equals(""));
        String command = "tail " + " -n +" + (endNum + 1) + "  " + filePath;
        return command;

    }

    public static class JobTaskInfo {


        public String jobStatus;

        public String taskStatus;

        public String ip;

        public String jobId;

        public String componentId;

    }

    ;

    public JobTaskInfo getJobTaskInfo(String jobId, String componentId,String role,String partyId) {

        JobTaskInfo jobTaskInfo = new JobTaskInfo();

        jobTaskInfo.jobId = jobId;

        jobTaskInfo.componentId = componentId;

        JobWithBLOBs jobWithBLOBs = jobManagerService.queryJobByConditions(jobId,role,partyId);

        Preconditions.checkArgument(jobWithBLOBs != null, "job info " + jobId + " is not exist");

        String ip = jobWithBLOBs.getfRunIp();

        jobTaskInfo.jobStatus = jobWithBLOBs.getfStatus();

        if (componentId != null && !componentId.equals(DEFAULT_COMPONENT_ID)) {

            TaskExample taskExample = new TaskExample();

            taskExample.createCriteria().andFJobIdEqualTo(jobId).andFComponentNameEqualTo(componentId).andFRoleEqualTo(role).andFPartyIdEqualTo(partyId);

            List<Task> tasks = taskMapper.selectByExample(taskExample);

            Preconditions.checkArgument(tasks != null && tasks.size() > 0, "task info " + jobId + "," + componentId + " is not exist");

            Task task = tasks.get(0);

            ip = task.getfRunIp();

            jobTaskInfo.taskStatus = task.getfStatus();

        }
        jobTaskInfo.ip = ip;
        return jobTaskInfo;

    }
}
