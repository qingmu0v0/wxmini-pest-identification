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
}
