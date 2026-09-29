package com.aideception.educator.service;

import com.aideception.educator.dto.ScenarioAttemptDTO;
import com.aideception.educator.entity.Scenario;
import com.aideception.educator.entity.ScenarioAttempt;
import com.aideception.educator.entity.User;
import com.aideception.educator.entity.VulnerabilityProfile;
import com.aideception.educator.repository.ScenarioAttemptRepository;
import com.aideception.educator.repository.ScenarioRepository;
import com.aideception.educator.repository.UserRepository;
import com.aideception.educator.repository.VulnerabilityProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScenarioAttemptService {
    @Autowired
    private ScenarioAttemptRepository attemptRepository;
    
    @Autowired
    private ScenarioRepository scenarioRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private VulnerabilityProfileRepository vulnerabilityProfileRepository;
    
    @Transactional
    public ScenarioAttemptDTO submitAttempt(ScenarioAttemptDTO dto, String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Scenario scenario = scenarioRepository.findById(dto.getScenarioId())
            .orElseThrow(() -> new RuntimeException("Scenario not found"));
        
        boolean isCorrect = dto.getUserAnswer().equals(scenario.getIsDeceptive());
        
        ScenarioAttempt attempt = new ScenarioAttempt();
        attempt.setUser(user);
        attempt.setScenario(scenario);
        attempt.setUserAnswer(dto.getUserAnswer());
        attempt.setIsCorrect(isCorrect);
        attempt.setTimeSpentSeconds(dto.getTimeSpentSeconds());
        attempt.setUserReasoning(dto.getUserReasoning());
        
        attempt = attemptRepository.save(attempt);
        
        updateVulnerabilityProfile(user, scenario, isCorrect, dto.getUserAnswer());
        
        return convertToDTO(attempt);
    }
    
    private void updateVulnerabilityProfile(User user, Scenario scenario, boolean isCorrect, Boolean userAnswer) {
        if (user.getRole() != User.UserRole.STUDENT) {
            return;
        }
        
        VulnerabilityProfile profile = vulnerabilityProfileRepository.findByUser_Id(user.getId())
            .orElseGet(() -> {
                VulnerabilityProfile newProfile = new VulnerabilityProfile();
                newProfile.setUser(user);
                return vulnerabilityProfileRepository.save(newProfile);
            });
        
        profile.setTotalAttempts(profile.getTotalAttempts() + 1);
        if (isCorrect) {
            profile.setCorrectAttempts(profile.getCorrectAttempts() + 1);
        }
        profile.setOverallAccuracy(
            (double) profile.getCorrectAttempts() / profile.getTotalAttempts() * 100
        );
        
        if (!isCorrect) {
            double increment = 5.0;
            switch (scenario.getCategory()) {
                case EMOTIONAL_MANIPULATION:
                    profile.setEmotionalManipulationScore(
                        Math.min(100, profile.getEmotionalManipulationScore() + increment)
                    );
                    break;
                case AUTHORITY_BIAS:
                    profile.setAuthorityBiasScore(
                        Math.min(100, profile.getAuthorityBiasScore() + increment)
                    );
                    break;
                case URGENCY_TACTICS:
                    profile.setUrgencyTacticsScore(
                        Math.min(100, profile.getUrgencyTacticsScore() + increment)
                    );
                    break;
                case VISUAL_INCONSISTENCY:
                    profile.setVisualInconsistencyScore(
                        Math.min(100, profile.getVisualInconsistencyScore() + increment)
                    );
                    break;
                case AUDIO_INCONSISTENCY:
                    profile.setAudioInconsistencyScore(
                        Math.min(100, profile.getAudioInconsistencyScore() + increment)
                    );
                    break;
                case SOURCE_VERIFICATION:
                    profile.setSourceVerificationScore(
                        Math.min(100, profile.getSourceVerificationScore() + increment)
                    );
                    break;
                case SOCIAL_PROOF:
                    profile.setSocialProofScore(
                        Math.min(100, profile.getSocialProofScore() + increment)
                    );
                    break;
                case SCARCITY:
                    profile.setScarcityScore(
                        Math.min(100, profile.getScarcityScore() + increment)
                    );
                    break;
            }
        } else {
            double decrement = 2.0;
            switch (scenario.getCategory()) {
                case EMOTIONAL_MANIPULATION:
                    profile.setEmotionalManipulationScore(
                        Math.max(0, profile.getEmotionalManipulationScore() - decrement)
                    );
                    break;
                case AUTHORITY_BIAS:
                    profile.setAuthorityBiasScore(
                        Math.max(0, profile.getAuthorityBiasScore() - decrement)
                    );
                    break;
                case URGENCY_TACTICS:
                    profile.setUrgencyTacticsScore(
                        Math.max(0, profile.getUrgencyTacticsScore() - decrement)
                    );
                    break;
                case VISUAL_INCONSISTENCY:
                    profile.setVisualInconsistencyScore(
                        Math.max(0, profile.getVisualInconsistencyScore() - decrement)
                    );
                    break;
                case AUDIO_INCONSISTENCY:
                    profile.setAudioInconsistencyScore(
                        Math.max(0, profile.getAudioInconsistencyScore() - decrement)
                    );
                    break;
                case SOURCE_VERIFICATION:
                    profile.setSourceVerificationScore(
                        Math.max(0, profile.getSourceVerificationScore() - decrement)
                    );
                    break;
                case SOCIAL_PROOF:
                    profile.setSocialProofScore(
                        Math.max(0, profile.getSocialProofScore() - decrement)
                    );
                    break;
                case SCARCITY:
                    profile.setScarcityScore(
                        Math.max(0, profile.getScarcityScore() - decrement)
                    );
                    break;
            }
        }
        
        vulnerabilityProfileRepository.save(profile);
    }
    
    public List<ScenarioAttemptDTO> getUserAttempts(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        return attemptRepository.findByUser_Id(user.getId()).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    private ScenarioAttemptDTO convertToDTO(ScenarioAttempt attempt) {
        ScenarioAttemptDTO dto = new ScenarioAttemptDTO();
        dto.setId(attempt.getId());
        dto.setUserId(attempt.getUser().getId());
        dto.setScenarioId(attempt.getScenario().getId());
        dto.setUserAnswer(attempt.getUserAnswer());
        dto.setIsCorrect(attempt.getIsCorrect());
        dto.setTimeSpentSeconds(attempt.getTimeSpentSeconds());
        dto.setUserReasoning(attempt.getUserReasoning());
        dto.setAttemptedAt(attempt.getAttemptedAt());
        return dto;
    }
}
