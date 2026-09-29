package com.aideception.educator.controller;

import com.aideception.educator.dto.ScenarioDTO;
import com.aideception.educator.entity.Scenario;
import com.aideception.educator.service.ScenarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scenarios")
public class ScenarioController {
    @Autowired
    private ScenarioService scenarioService;
    
    @GetMapping
    public ResponseEntity<List<ScenarioDTO>> getAllScenarios() {
        return ResponseEntity.ok(scenarioService.getAllScenarios());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ScenarioDTO> getScenarioById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(scenarioService.getScenarioById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<ScenarioDTO>> getScenariosByType(@PathVariable String type) {
        try {
            Scenario.ScenarioType scenarioType = Scenario.ScenarioType.valueOf(type.toUpperCase());
            return ResponseEntity.ok(scenarioService.getScenariosByType(scenarioType));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ScenarioDTO>> getScenariosByCategory(@PathVariable String category) {
        try {
            Scenario.DeceptionCategory deceptionCategory = Scenario.DeceptionCategory.valueOf(category.toUpperCase());
            return ResponseEntity.ok(scenarioService.getScenariosByCategory(deceptionCategory));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<ScenarioDTO>> getScenariosByDifficulty(@PathVariable Integer difficulty) {
        return ResponseEntity.ok(scenarioService.getScenariosByDifficulty(difficulty));
    }
    
    @PostMapping
    public ResponseEntity<ScenarioDTO> createScenario(@RequestBody ScenarioDTO dto, Authentication authentication) {
        try {
            String username = authentication.getName();
            return ResponseEntity.ok(scenarioService.createScenario(dto, username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
