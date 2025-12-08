package com.plantpest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 图片分析响应DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResponse {
    /**
     * 是否成功
     */
    private Boolean success;
    
    /**
     * 植物名称
     */
    private String plantName;
    
    /**
     * 是否检测到虫蛀
     */
    private Boolean hasWormDamage;
    
    /**
     * 虫蛀风险等级：0-无风险，1-低风险，2-中风险，3-高风险
     */
    private Integer wormRiskLevel;
    
    /**
     * 是否检测到蚜虫
     */
    private Boolean hasAphid;
    
    /**
     * 蚜虫数量估计
     */
    private String aphidCount;
    
    /**
     * 蚜虫种类名称
     */
    private String aphidSpecies;
    
    /**
     * 识别置信度 (0.0-1.0)
     */
    private Double confidence;
    
    /**
     * 识别类型：plant(植物)或pest(害虫)
     */
    private String identificationType;
    
    /**
     * 害虫名称（如果识别的是害虫）
     */
    private String pestName;
    
    /**
     * 详细分析结果
     */
    private String detailedAnalysis;
    
    /**
     * 防治建议
     */
    private String suggestion;
    
    /**
     * 使用的模型
     */
    private String modelUsed;
    
    /**
     * 错误信息
     */
    private String errorMessage;

    /**
     * 检测到的害虫/病害列表
     */
    private java.util.List<String> detectedPests;
}
