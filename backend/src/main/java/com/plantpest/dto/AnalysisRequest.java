package com.plantpest.dto;

import lombok.Data;

/**
 * 图片分析请求DTO
 */
@Data
public class AnalysisRequest {
    /**
     * 图片Base64编码或URL
     */
    private String imageData;
    
    /**
     * 使用的AI模型类型
     */
    private String modelType = "qwen3";
}
