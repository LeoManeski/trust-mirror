package com.aideception.educator.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScenarioAttemptDTO {
    private Long id;
    private Long userId;
    private Long scenarioId;
    private Boolean userAnswer;
    private Boolean isCorrect;
    private Integer timeSpentSeconds;
    private String userReasoning;
    private LocalDateTime attemptedAt;
    private ScenarioDTO scenario;
}
