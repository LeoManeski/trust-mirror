package com.aideception.educator.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "scenario_attempts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScenarioAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scenario_id", nullable = false)
    private Scenario scenario;
    
    @Column(nullable = false)
    private Boolean userAnswer; // What the user thought (true = deceptive, false = authentic)
    
    @Column(nullable = false)
    private Boolean isCorrect;
    
    private Integer timeSpentSeconds;
    
    private String userReasoning; // Optional reasoning provided by user
    
    private LocalDateTime attemptedAt;
    
    @PrePersist
    protected void onCreate() {
        attemptedAt = LocalDateTime.now();
    }
}
