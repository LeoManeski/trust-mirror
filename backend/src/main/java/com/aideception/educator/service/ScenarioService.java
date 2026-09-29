package com.aideception.educator.service;

import com.aideception.educator.dto.ScenarioDTO;
import com.aideception.educator.entity.Scenario;
import com.aideception.educator.entity.User;
import com.aideception.educator.repository.ScenarioRepository;
import com.aideception.educator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScenarioService {
    @Autowired
    private ScenarioRepository scenarioRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<ScenarioDTO> getAllScenarios() {
        return scenarioRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public ScenarioDTO getScenarioById(Long id) {
        Scenario scenario = scenarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Scenario not found"));
        return convertToDTO(scenario);
    }
    
    public List<ScenarioDTO> getScenariosByType(Scenario.ScenarioType type) {
        return scenarioRepository.findByType(type).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<ScenarioDTO> getScenariosByCategory(Scenario.DeceptionCategory category) {
        return scenarioRepository.findByCategory(category).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    public List<ScenarioDTO> getScenariosByDifficulty(Integer difficulty) {
        return scenarioRepository.findByDifficultyLevel(difficulty).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    @Transactional
    public ScenarioDTO createScenario(ScenarioDTO dto, String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Scenario scenario = new Scenario();
        scenario.setTitle(dto.getTitle());
        scenario.setDescription(dto.getDescription());
        scenario.setType(dto.getType());
        scenario.setCategory(dto.getCategory());
        scenario.setContent(dto.getContent());
        scenario.setExplanation(dto.getExplanation());
        scenario.setIsDeceptive(dto.getIsDeceptive());
        scenario.setManipulationTechniques(dto.getManipulationTechniques());
        scenario.setPsychologicalTriggers(dto.getPsychologicalTriggers());
        scenario.setImageUrl(dto.getImageUrl());
        scenario.setVideoUrl(dto.getVideoUrl());
        scenario.setAudioUrl(dto.getAudioUrl());
        scenario.setDifficultyLevel(dto.getDifficultyLevel());
        scenario.setCreatedBy(user);
        
        scenario = scenarioRepository.save(scenario);
        return convertToDTO(scenario);
    }
    
    private ScenarioDTO convertToDTO(Scenario scenario) {
        ScenarioDTO dto = new ScenarioDTO();
        dto.setId(scenario.getId());
        dto.setTitle(scenario.getTitle());
        dto.setDescription(scenario.getDescription());
        dto.setType(scenario.getType());
        dto.setCategory(scenario.getCategory());
        dto.setContent(scenario.getContent());
        dto.setExplanation(scenario.getExplanation());
        dto.setIsDeceptive(scenario.getIsDeceptive());
        dto.setManipulationTechniques(scenario.getManipulationTechniques());
        dto.setPsychologicalTriggers(scenario.getPsychologicalTriggers());
        dto.setImageUrl(scenario.getImageUrl());
        dto.setVideoUrl(scenario.getVideoUrl());
        dto.setAudioUrl(scenario.getAudioUrl());
        dto.setDifficultyLevel(scenario.getDifficultyLevel());
        dto.setCreatedAt(scenario.getCreatedAt());
        dto.setCreatedById(scenario.getCreatedBy() != null ? scenario.getCreatedBy().getId() : null);
        return dto;
    }
}
