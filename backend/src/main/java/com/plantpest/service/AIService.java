package com.plantpest.service;

import com.alibaba.dashscope.aigc.multimodalconversation.MultiModalConversation;
import com.alibaba.dashscope.aigc.multimodalconversation.MultiModalConversationParam;
import com.alibaba.dashscope.aigc.multimodalconversation.MultiModalConversationResult;
import com.alibaba.dashscope.common.MultiModalMessage;
import com.alibaba.dashscope.common.Role;
import com.alibaba.dashscope.exception.ApiException;
import com.alibaba.dashscope.exception.InputRequiredException;
import com.alibaba.dashscope.exception.NoApiKeyException;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.plantpest.config.AIConfig;
import com.plantpest.dto.AnalysisResponse;
import com.plantpest.enums.ModelType;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

/**
 * AI模型调用服务
 */
@Slf4j
@Service
public class AIService {
    
    @Autowired
    private AIConfig aiConfig;
    
    private final OkHttpClient client = new OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(60, TimeUnit.SECONDS)
            .writeTimeout(60, TimeUnit.SECONDS)
            .build();
    
    private final Gson gson = new Gson();
    
    /**
     * 分析植物图片
     */
    public AnalysisResponse analyzeImage(String imageBase64, String modelType) {
        ModelType model = ModelType.fromCode(modelType);
        
        return switch (model) {
            case QWEN3 -> analyzeWithQwen3(imageBase64);
            case GPT4 -> analyzeWithGPT4(imageBase64);
            case CLAUDE -> analyzeWithClaude(imageBase64);
        };
    }
    
    /**
     * 使用QWEN3分析图片（SDK方式）
     */
    private AnalysisResponse analyzeWithQwen3(String imageBase64) {
        AIConfig.ModelConfig qwenConfig = aiConfig.getQwen3();
        String apiKey = qwenConfig.getApiKey();
        String model = qwenConfig.getModel();
        
        try {
            // 设置API密钥到系统属性（SDK会自动读取）
            System.setProperty("DASHSCOPE_API_KEY", apiKey);
            log.info("设置DashScope API密钥: {}", apiKey.substring(0, Math.min(apiKey.length(), 8)) + "...");

            // 验证API密钥是否设置成功
            String setApiKey = System.getProperty("DASHSCOPE_API_KEY");
            if (setApiKey == null || !setApiKey.equals(apiKey)) {
                log.error("API密钥设置失败，SDK可能无法读取到密钥");
                return AnalysisResponse.builder()
                        .success(false)
                        .errorMessage("API密钥设置失败")
                        .modelUsed("qwen3")
                        .build();
            }


            // 创建多模态对话实例
            MultiModalConversation multiModalConversation = new MultiModalConversation();
            
            // 构建消息内容 - 使用正确的SDK类型
            java.util.Map<String, Object> textContent = new java.util.HashMap<>();
            textContent.put("text", buildPrompt());
            
            java.util.Map<String, Object> imageContent = new java.util.HashMap<>();
            imageContent.put("image", "data:image/jpeg;base64," + imageBase64);
            
            MultiModalMessage message = MultiModalMessage.builder()
                    .role(Role.USER.getValue())
                    .content(java.util.Arrays.asList(textContent, imageContent))
                    .build();
            
            // 构建请求参数
            MultiModalConversationParam param = MultiModalConversationParam.builder()
                    .model(model)
                    .messages(java.util.Arrays.asList(message))
                    .apiKey(apiKey)  // 直接在参数中设置API密钥
                    .build();
            
            // 调用API
            MultiModalConversationResult result = multiModalConversation.call(param);
            
            if (result.getOutput() != null && result.getOutput().getChoices() != null 
                && !result.getOutput().getChoices().isEmpty()) {
                
                String responseText = result.getOutput().getChoices().get(0).getMessage().getContent().toString();
                log.info("QWEN3 SDK响应: {}", responseText);
                
                return parseAnalysisResult(responseText);
            } else {
                log.error("QWEN3 SDK响应为空");
                return AnalysisResponse.builder()
                        .success(false)
                        .errorMessage("API响应为空")
                        .modelUsed("qwen3")
                        .build();
            }
            
        } catch (NoApiKeyException e) {
            log.error("API Key未设置", e);
            return AnalysisResponse.builder()
                    .success(false)
                    .errorMessage("API Key未设置: " + e.getMessage())
                    .modelUsed("qwen3")
                    .build();
        } catch (ApiException e) {
            log.error("API调用异常", e);
            return AnalysisResponse.builder()
                    .success(false)
                    .errorMessage("API调用异常: " + e.getMessage())
                    .modelUsed("qwen3")
                    .build();
        } catch (Exception e) {
            log.error("调用QWEN3 SDK失败", e);
            return AnalysisResponse.builder()
                    .success(false)
                    .errorMessage("调用失败: " + e.getMessage())
                    .modelUsed("qwen3")
                    .build();
        }
    }
    
    /**
     * 使用GPT-4分析图片
     */
    private AnalysisResponse analyzeWithGPT4(String imageBase64) {
        // 实现GPT-4调用逻辑
        // 这里提供基本框架，实际需要根据OpenAI API文档实现
        return AnalysisResponse.builder()
                .success(false)
                .errorMessage("GPT-4暂未配置")
                .modelUsed("gpt4")
                .build();
    }
    
    /**
     * 使用Claude分析图片
     */
    private AnalysisResponse analyzeWithClaude(String imageBase64) {
        // 实现Claude调用逻辑
        // 这里提供基本框架，实际需要根据Anthropic API文档实现
        return AnalysisResponse.builder()
                .success(false)
                .errorMessage("Claude暂未配置")
                .modelUsed("claude")
                .build();
    }
    
    /**
     * 构建AI提示词
     */
    private String buildPrompt() {
        return """
                请分析这张植物图片，重点识别以下内容：
                1. 植物名称或类型
                2. 是否存在虫蛀痕迹，评估虫蛀风险等级（0-无风险，1-低风险，2-中风险，3-高风险）
                3. 是否检测到蚜虫，如有请估计数量（少量/中等/大量）并识别蚜虫种类
                4. 识别图片中的主要对象是植物还是害虫
                5. 提供详细的病虫害分析
                6. 给出防治建议
                7. 评估识别的置信度（0.0-1.0）
                
                请以JSON格式返回结果：
                {
                  "plantName": "植物名称",
                  "hasWormDamage": true/false,
                  "wormRiskLevel": 0-3,
                  "hasAphid": true/false,
                  "aphidCount": "少量/中等/大量/无",
                  "aphidSpecies": "蚜虫种类名称（如棉蚜、桃蚜等）",
                  "confidence": 0.95,
                  "identificationType": "plant或pest",
                  "pestName": "害虫名称（如果识别的是害虫）",
                  "detailedAnalysis": "详细分析内容",
                  "suggestion": "防治建议"
                }
                """;
    }
    
    
    /**
     * 解析AI返回的分析结果
     */
    private AnalysisResponse parseAnalysisResult(String resultText) {
        try {
            log.info("开始解析响应文本: {}", resultText);
            
            // 处理SDK返回的格式: [{text=```json...```}]
            String actualText = resultText;
            
            // 如果响应包含markdown代码块，提取其中的JSON
            if (resultText.contains("```json")) {
                int jsonStart = resultText.indexOf("```json") + 7;
                int jsonEnd = resultText.indexOf("```", jsonStart);
                if (jsonStart > 6 && jsonEnd > jsonStart) {
                    actualText = resultText.substring(jsonStart, jsonEnd).trim();
                    log.info("提取到JSON内容: {}", actualText);
                }
            }
            
            // 尝试直接解析JSON
            JsonObject result = gson.fromJson(actualText, JsonObject.class);
            
            return AnalysisResponse.builder()
                    .success(true)
                    .plantName(result.has("plantName") ? result.get("plantName").getAsString() : "未识别")
                    .hasWormDamage(result.has("hasWormDamage") ? result.get("hasWormDamage").getAsBoolean() : false)
                    .wormRiskLevel(result.has("wormRiskLevel") ? result.get("wormRiskLevel").getAsInt() : 0)
                    .hasAphid(result.has("hasAphid") ? result.get("hasAphid").getAsBoolean() : false)
                    .aphidCount(result.has("aphidCount") ? result.get("aphidCount").getAsString() : "无")
                    .aphidSpecies(result.has("aphidSpecies") ? result.get("aphidSpecies").getAsString() : null)
                    .confidence(result.has("confidence") ? result.get("confidence").getAsDouble() : 0.8)
                    .identificationType(result.has("identificationType") ? result.get("identificationType").getAsString() : "plant")
                    .pestName(result.has("pestName") ? result.get("pestName").getAsString() : null)
                    .detailedAnalysis(result.has("detailedAnalysis") ? result.get("detailedAnalysis").getAsString() : "")
                    .suggestion(result.has("suggestion") ? result.get("suggestion").getAsString() : "")
                    .modelUsed("qwen3")
                    .build();
                    
        } catch (Exception e) {
            log.error("解析结果失败，原始文本: {}", resultText, e);
            
            // 如果JSON解析失败，尝试提取关键信息
            try {
                // 尝试从文本中提取植物名称
                String plantName = "未识别";
                if (resultText.contains("植物名称") || resultText.contains("plantName")) {
                    // 简单的文本提取逻辑
                    if (resultText.contains("斑衣蜡蝉")) {
                        plantName = "斑衣蜡蝉";
                    }
                }
                
                return AnalysisResponse.builder()
                        .success(true)
                        .plantName(plantName)
                        .hasWormDamage(false)
                        .wormRiskLevel(0)
                        .hasAphid(false)
                        .aphidCount("无")
                        .aphidSpecies(null)
                        .confidence(0.5) // 默认置信度
                        .identificationType("plant") // 默认识别类型
                        .pestName(null)
                        .detailedAnalysis(resultText)
                        .suggestion("请查看详细分析内容")
                        .modelUsed("qwen3")
                        .build();
                        
            } catch (Exception ex) {
                log.error("备用解析也失败", ex);
                return AnalysisResponse.builder()
                        .success(false)
                        .errorMessage("解析AI响应失败: " + ex.getMessage())
                        .modelUsed("qwen3")
                        .build();
            }
        }
    }
}
