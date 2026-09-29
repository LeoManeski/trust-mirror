package com.aideception.educator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.aideception.educator.entity")
@EnableJpaRepositories(basePackages = "com.aideception.educator.repository")
public class AiDeceptionEducatorApplication {
    public static void main(String[] args) {
        SpringApplication.run(AiDeceptionEducatorApplication.class, args);
    }
}
