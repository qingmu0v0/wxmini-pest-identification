package com.plantpest.service;

import cn.hutool.core.util.IdUtil;
import com.plantpest.config.FileConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

/**
 * 文件服务
 */
@Slf4j
@Service
public class FileService {
    
    @Autowired
    private FileConfig fileConfig;
    
    /**
     * 保存上传的文件
     */
    public String saveFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename != null && originalFilename.contains(".") 
                ? originalFilename.substring(originalFilename.lastIndexOf(".")) 
                : "";
        
        String filename = IdUtil.simpleUUID() + extension;
        Path filePath = Paths.get(fileConfig.getUploadDir(), filename);
        
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());
        
        log.info("文件保存成功: {}", filename);
        return filename;
    }
    
    /**
     * 将文件转换为Base64
     */
    public String fileToBase64(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        return Base64.getEncoder().encodeToString(bytes);
    }
    
    /**
     * 读取文件并转换为Base64
     */
    public String readFileAsBase64(String filename) throws IOException {
        Path filePath = Paths.get(fileConfig.getUploadDir(), filename);
        byte[] bytes = Files.readAllBytes(filePath);
        return Base64.getEncoder().encodeToString(bytes);
    }
    
    /**
     * 删除文件
     */
    public boolean deleteFile(String filename) {
        try {
            Path filePath = Paths.get(fileConfig.getUploadDir(), filename);
            return Files.deleteIfExists(filePath);
        } catch (IOException e) {
            log.error("删除文件失败", e);
            return false;
        }
    }
}
