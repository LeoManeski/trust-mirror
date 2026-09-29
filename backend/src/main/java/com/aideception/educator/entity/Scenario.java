package com.aideception.educator.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "scenarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Scenario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 2000)
    private String description;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ScenarioType type;
    
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DeceptionCategory category;
    
    @Column(length = 5000)
    private String content;
    
    @Column(length = 3000)
    private String explanation;
    
    @Column(nullable = false)
    private Boolean isDeceptive;
    
    @Column(length = 2000)
    private String manipulationTechniques;
    
    @Column(length = 2000)
    private String psychologicalTriggers;
    
    private String imageUrl;
    private String videoUrl;
    private String audioUrl;
    
    private Integer difficultyLevel;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;
    
    @OneToMany(mappedBy = "scenario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ScenarioAttempt> attempts = new ArrayList<>();
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum ScenarioType {
        TEXT_MESSAGE,
        SOCIAL_MEDIA_POST,
        VIDEO,
        AUDIO,
        SCREENSHOT,
        EMAIL,
        NEWS_ARTICLE
    }
    
    public enum DeceptionCategory {
        EMOTIONAL_MANIPULATION,
        AUTHORITY_BIAS,
        URGENCY_TACTICS,
        VISUAL_INCONSISTENCY,
        AUDIO_INCONSISTENCY,
        SOURCE_VERIFICATION,
        SOCIAL_PROOF,
        SCARCITY
    }
}
