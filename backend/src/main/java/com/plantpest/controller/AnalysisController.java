package com.plantpest.controller;

import com.plantpest.dto.AnalysisRequest;
import com.plantpest.dto.AnalysisResponse;
import com.plantpest.dto.ApiResult;
import com.plantpest.service.AIService;
import com.plantpest.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 图片分析控制器
 */
@Slf4j
@RestController
@RequestMapping("/analysis")
public class AnalysisController {
    
    @Autowired
    private AIService aiService;
    
    @Autowired
    private FileService fileService;
    
    /**
     * 上传图片并分析
     */
    @PostMapping("/upload")
    public ApiResult<AnalysisResponse> uploadAndAnalyze(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "modelType", defaultValue = "qwen3") String modelType) {
        
        try {
            // 验证文件
            if (file.isEmpty()) {
                return ApiResult.error("文件不能为空");
            }
            
            // 验证文件类型
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ApiResult.error("只支持图片文件");
            }
            
            log.info("接收到图片上传请求，文件大小: {} KB, 模型类型: {}", 
                    file.getSize() / 1024, modelType);
            
            // 保存文件
            String filename = fileService.saveFile(file);
            
            // 转换为Base64
            String base64 = fileService.fileToBase64(file);
            
            // 调用AI分析
            AnalysisResponse response = aiService.analyzeImage(base64, modelType);
            
            log.info("图片分析完成，结果: {}", response.getSuccess());
            
            return ApiResult.success("分析完成", response);
            
        } catch (Exception e) {
            log.error("图片分析失败", e);
            return ApiResult.error("分析失败: " + e.getMessage());
        }
    }
    
    /**
     * 使用Base64分析
     */
    @PostMapping("/analyze")
    public ApiResult<AnalysisResponse> analyzeBase64(@RequestBody AnalysisRequest request) {
        try {
            if (request.getImageData() == null || request.getImageData().isEmpty()) {
                return ApiResult.error("图片数据不能为空");
            }
            
            String base64 = request.getImageData();
            // 移除data:image前缀
            if (base64.contains(",")) {
                base64 = base64.substring(base64.indexOf(",") + 1);
            }
            
            log.info("接收到Base64分析请求，模型类型: {}", request.getModelType());
            
            AnalysisResponse response = aiService.analyzeImage(base64, request.getModelType());
            
            return ApiResult.success("分析完成", response);
            
        } catch (Exception e) {
            log.error("图片分析失败", e);
            return ApiResult.error("分析失败: " + e.getMessage());
        }
    }
    
    /**
     * 获取支持的模型列表
     */
    @GetMapping("/models")
    public ApiResult<String[]> getModels() {
        return ApiResult.success(new String[]{"qwen3"});
    }
    
    /**
     * 健康检查
     */
    @GetMapping("/health")
    public ApiResult<String> health() {
        return ApiResult.success("服务正常运行");
    }
}
