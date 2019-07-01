package com.webank.ai.fate.board.ssh;

import com.google.common.base.Preconditions;
import com.jcraft.jsch.Channel;
import com.webank.ai.fate.board.log.LogFileService;
import com.webank.ai.fate.board.log.LogScanner;
import com.webank.ai.fate.board.pojo.SshInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * @Description TODO
 * @Author kaideng
 **/
public class SshLogScanner implements Runnable, LogScanner {


    Logger logger = LoggerFactory.getLogger(SshLogScanner.class);

    javax.websocket.Session webSocketSession;

    boolean needStop = false;

    String jobId;

    String componentId;

    String type;

    String filePath;

    LogFileService logFileService;

    SshInfo sshInfo;

    public SshLogScanner(javax.websocket.Session webSocketSession,
                         LogFileService logFileService,
                         SshInfo sshInfo,
                         String jobId, String componentId, String type) {
        Preconditions.checkArgument(jobId != null && !jobId.equals(""));
        this.jobId = jobId;
        Preconditions.checkArgument(componentId != null && !componentId.equals(""));
        this.componentId = componentId;
        this.filePath = logFileService.buildFilePath(jobId, componentId, type);
        this.sshInfo = sshInfo;
        Preconditions.checkArgument(type != null && !type.equals(""));
        this.type = type;
        this.webSocketSession = webSocketSession;
        this.logFileService = logFileService;
    }


    public void pullLog() throws IOException {

        BufferedReader reader = null;
        Channel wcChannel = null;
        Channel tailChannel = null;

        try {
            int beginNum = 0;
            int readLine = beginNum;
            //tailChannel = logFileService.getRemoteLogStream(  jobId, componentId,beginNum);
            String ip = sshInfo.getIp();
            Channel channel = null;
            InputStream inputStream = null;
            while (webSocketSession.isOpen() && !needStop) {

                try {
                    String cmd = logFileService.buildCommand(beginNum, filePath);
                    channel = logFileService.getRemoteLogStream(sshInfo, cmd);
                    inputStream = channel.getInputStream();
                    reader = new BufferedReader(new InputStreamReader(inputStream));
                    String content = reader.readLine();
                    while ((content = reader.readLine()) != null && !needStop) {
                        readLine++;
                        String jsonContent = LogFileService.toJsonString(content, 0, readLine);
                        // System.err.println("=======================" + jsonContent);
                        if (webSocketSession.isOpen()) {
                            webSocketSession.getBasicRemote().sendText(jsonContent);
                        } else {
                            break;
                        }
                    }
                } finally {
                    if (channel != null) {
                        channel.disconnect();
                    }
                    if (inputStream != null) {
                        inputStream.close();
                    }
                }
                if (readLine > beginNum) {
                    Thread.sleep(200);
                } else {
                    Thread.sleep(10000);
                }
                beginNum = readLine;
            }
        } catch (Throwable e) {
            e.printStackTrace();
            logger.error("close web socket session");
            webSocketSession.close();
        } finally {
            if (wcChannel != null) {
                wcChannel.disconnect();
            }
            if (tailChannel != null) {
                tailChannel.disconnect();
            }
        }

    }

    @Override
    public void run() {

        try {
            this.pullLog();
        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                webSocketSession.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public boolean isNeedStop() {
        return needStop;
    }

    @Override
    public void setNeedStop(boolean needStop) {
        this.needStop = needStop;

    }
}
