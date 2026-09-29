package com.aideception.educator.controller;

import com.aideception.educator.dto.ScenarioAttemptDTO;
import com.aideception.educator.service.ScenarioAttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attempts")
public class ScenarioAttemptController {
    @Autowired
    private ScenarioAttemptService attemptService;
    
    @PostMapping
    public ResponseEntity<ScenarioAttemptDTO> submitAttempt(@RequestBody ScenarioAttemptDTO dto, Authentication authentication) {
        try {
            String username = authentication.getName();
            return ResponseEntity.ok(attemptService.submitAttempt(dto, username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/my-attempts")
    public ResponseEntity<List<ScenarioAttemptDTO>> getMyAttempts(Authentication authentication) {
        try {
            String username = authentication.getName();
            return ResponseEntity.ok(attemptService.getUserAttempts(username));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
