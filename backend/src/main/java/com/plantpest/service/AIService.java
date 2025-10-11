package com.plantpest.service;

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
        
        try {
            return switch (model) {
                case QWEN3 -> analyzeWithQwen3(imageBase64);
                case GPT4 -> analyzeWithGPT4(imageBase64);
                case CLAUDE -> analyzeWithClaude(imageBase64);
            };
        } catch (Exception e) {
            log.error("图片分析失败", e);
            return AnalysisResponse.builder()
                    .success(false)
                    .errorMessage("分析失败: " + e.getMessage())
                    .modelUsed(modelType)
                    .build();
        }
    }
    
    /**
     * 使用QWEN3分析图片
     */
    private AnalysisResponse analyzeWithQwen3(String imageBase64) throws IOException {
        String apiKey = aiConfig.getQwen3().get("api-key").toString();
        String endpoint = aiConfig.getQwen3().get("endpoint").toString();
        String model = aiConfig.getQwen3().get("model").toString();
        
        // 构建请求JSON
        JsonObject requestBody = new JsonObject();
        requestBody.addProperty("model", model);
        
        JsonObject input = new JsonObject();
        JsonArray messages = new JsonArray();
        
        JsonObject message = new JsonObject();
        message.addProperty("role", "user");
        
        JsonArray content = new JsonArray();
        
        // 添加文本提示
        JsonObject textContent = new JsonObject();
        textContent.addProperty("text", buildPrompt());
        content.add(textContent);
        
        // 添加图片
        JsonObject imageContent = new JsonObject();
        imageContent.addProperty("image", "data:image/jpeg;base64," + imageBase64);
        content.add(imageContent);
        
        message.add("content", content);
        messages.add(message);
        input.add("messages", messages);
        
        requestBody.add("input", input);
        
        // 发送请求
        RequestBody body = RequestBody.create(
                requestBody.toString(),
                MediaType.parse("application/json")
        );
        
        Request request = new Request.Builder()
                .url(endpoint)
                .addHeader("Authorization", "Bearer " + apiKey)
                .addHeader("Content-Type", "application/json")
                .post(body)
                .build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("请求失败: " + response.code());
            }
            
            String responseBody = response.body().string();
            return parseQwenResponse(responseBody);
        }
    }
    
    /**
     * 使用GPT-4分析图片
     */
    private AnalysisResponse analyzeWithGPT4(String imageBase64) throws IOException {
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
    private AnalysisResponse analyzeWithClaude(String imageBase64) throws IOException {
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
                3. 是否检测到蚜虫，如有请估计数量（少量/中等/大量）
                4. 提供详细的病虫害分析
                5. 给出防治建议
                
                请以JSON格式返回结果：
                {
                  "plantName": "植物名称",
                  "hasWormDamage": true/false,
                  "wormRiskLevel": 0-3,
                  "hasAphid": true/false,
                  "aphidCount": "少量/中等/大量/无",
                  "detailedAnalysis": "详细分析内容",
                  "suggestion": "防治建议"
                }
                """;
    }
    
    /**
     * 解析QWEN响应
     */
    private AnalysisResponse parseQwenResponse(String responseBody) {
        try {
            JsonObject jsonResponse = gson.fromJson(responseBody, JsonObject.class);
            JsonObject output = jsonResponse.getAsJsonObject("output");
            JsonArray choices = output.getAsJsonArray("choices");
            JsonObject firstChoice = choices.get(0).getAsJsonObject();
            JsonObject message = firstChoice.getAsJsonObject("message");
            JsonArray contentArray = message.getAsJsonArray("content");
            
            String resultText = "";
            for (int i = 0; i < contentArray.size(); i++) {
                JsonObject contentItem = contentArray.get(i).getAsJsonObject();
                if (contentItem.has("text")) {
                    resultText = contentItem.get("text").getAsString();
                    break;
                }
            }
            
            // 尝试从文本中提取JSON
            return parseAnalysisResult(resultText);
            
        } catch (Exception e) {
            log.error("解析响应失败", e);
            return AnalysisResponse.builder()
                    .success(false)
                    .errorMessage("解析响应失败: " + e.getMessage())
                    .modelUsed("qwen3")
                    .build();
        }
    }
    
    /**
     * 解析AI返回的分析结果
     */
    private AnalysisResponse parseAnalysisResult(String resultText) {
        try {
            // 尝试提取JSON部分
            int jsonStart = resultText.indexOf("{");
            int jsonEnd = resultText.lastIndexOf("}");
            
            if (jsonStart >= 0 && jsonEnd > jsonStart) {
                String jsonStr = resultText.substring(jsonStart, jsonEnd + 1);
                JsonObject result = gson.fromJson(jsonStr, JsonObject.class);
                
                return AnalysisResponse.builder()
                        .success(true)
                        .plantName(result.has("plantName") ? result.get("plantName").getAsString() : "未识别")
                        .hasWormDamage(result.has("hasWormDamage") ? result.get("hasWormDamage").getAsBoolean() : false)
                        .wormRiskLevel(result.has("wormRiskLevel") ? result.get("wormRiskLevel").getAsInt() : 0)
                        .hasAphid(result.has("hasAphid") ? result.get("hasAphid").getAsBoolean() : false)
                        .aphidCount(result.has("aphidCount") ? result.get("aphidCount").getAsString() : "无")
                        .detailedAnalysis(result.has("detailedAnalysis") ? result.get("detailedAnalysis").getAsString() : "")
                        .suggestion(result.has("suggestion") ? result.get("suggestion").getAsString() : "")
                        .modelUsed("qwen3")
                        .build();
            }
            
            // 如果无法提取JSON，返回原始文本
            return AnalysisResponse.builder()
                    .success(true)
                    .detailedAnalysis(resultText)
                    .modelUsed("qwen3")
                    .build();
                    
        } catch (Exception e) {
            log.error("解析结果失败", e);
            return AnalysisResponse.builder()
                    .success(true)
                    .detailedAnalysis(resultText)
                    .modelUsed("qwen3")
                    .build();
        }
    }
}
