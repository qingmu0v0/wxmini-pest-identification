package com.plantpest.enums;

import lombok.Getter;

/**
 * AI模型类型枚举
 */
@Getter
public enum ModelType {
    QWEN3("qwen3", "通义千问"),
    GPT4("gpt4", "GPT-4 Vision"),
    CLAUDE("claude", "Claude 3");
    
    private final String code;
    private final String name;
    
    ModelType(String code, String name) {
        this.code = code;
        this.name = name;
    }
    
    public static ModelType fromCode(String code) {
        for (ModelType type : values()) {
            if (type.code.equals(code)) {
                return type;
            }
        }
        return QWEN3; // 默认返回QWEN3
    }
}
