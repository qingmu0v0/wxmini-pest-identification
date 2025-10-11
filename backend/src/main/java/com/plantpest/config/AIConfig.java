package com.plantpest.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

/**
 * AI模型配置
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "ai")
public class AIConfig {
    
    private String defaultModel;
    private Map<String, ModelConfig> qwen3 = new HashMap<>();
    private Map<String, ModelConfig> gpt4 = new HashMap<>();
    private Map<String, ModelConfig> claude = new HashMap<>();
    
    @Data
    public static class ModelConfig {
        private Boolean enabled;
        private String apiKey;
        private String endpoint;
        private String model;
    }
    
    public Map<String, ModelConfig> getModelConfig(String modelType) {
        return switch (modelType.toLowerCase()) {
            case "qwen3" -> qwen3;
            case "gpt4" -> gpt4;
            case "claude" -> claude;
            default -> qwen3;
        };
    }
}
