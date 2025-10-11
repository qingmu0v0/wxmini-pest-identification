package com.plantpest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * 植物病虫害识别系统主启动类
 */
@SpringBootApplication
@EnableConfigurationProperties
public class PlantPestApplication {
    public static void main(String[] args) {
        SpringApplication.run(PlantPestApplication.class, args);
        System.out.println("植物病虫害识别系统启动成功！");
    }
}
