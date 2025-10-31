package com.plantpest.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * AI模型配置
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "ai")
public class AIConfig {
    
    private String defaultModel;
    private ModelConfig qwen3 = new ModelConfig();
    private ModelConfig gpt4 = new ModelConfig();
    private ModelConfig claude = new ModelConfig();
    
    @Data
    public static class ModelConfig {
        private Boolean enabled;
        private String apiKey;
        private String endpoint;
        private String model;
    }
    
    public ModelConfig getModelConfig(String modelType) {
        return switch (modelType.toLowerCase()) {
            case "qwen3" -> qwen3;
            case "gpt4" -> gpt4;
            case "claude" -> claude;
            default -> qwen3;
        };
    }
}
