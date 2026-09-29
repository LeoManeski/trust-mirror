package com.aideception.educator.dto;

import com.aideception.educator.entity.Scenario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScenarioDTO {
    private Long id;
    private String title;
    private String description;
    private Scenario.ScenarioType type;
    private Scenario.DeceptionCategory category;
    private String content;
    private String explanation;
    private Boolean isDeceptive;
    private String manipulationTechniques;
    private String psychologicalTriggers;
    private String imageUrl;
    private String videoUrl;
    private String audioUrl;
    private Integer difficultyLevel;
    private LocalDateTime createdAt;
    private Long createdById;
}
