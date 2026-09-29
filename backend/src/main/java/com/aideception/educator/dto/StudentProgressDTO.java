package com.aideception.educator.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProgressDTO {
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private Integer totalAttempts;
    private Integer correctAttempts;
    private Double accuracy;
    private VulnerabilityProfileDTO vulnerabilityProfile;
    private List<ScenarioAttemptDTO> recentAttempts;
}
