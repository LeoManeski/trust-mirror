package com.aideception.educator.controller;

import com.aideception.educator.dto.StudentProgressDTO;
import com.aideception.educator.entity.User;
import com.aideception.educator.repository.UserRepository;
import com.aideception.educator.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("/students")
    public ResponseEntity<List<StudentProgressDTO>> getStudentProgress(Authentication authentication) {
        try {
            String username = authentication.getName();
            User teacher = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            if (teacher.getRole() != User.UserRole.TEACHER) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            
            return ResponseEntity.ok(teacherService.getStudentProgress(teacher.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
