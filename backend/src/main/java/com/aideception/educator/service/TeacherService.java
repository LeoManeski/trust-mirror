package com.aideception.educator.service;

import com.aideception.educator.dto.ScenarioAttemptDTO;
import com.aideception.educator.dto.StudentProgressDTO;
import com.aideception.educator.dto.VulnerabilityProfileDTO;
import com.aideception.educator.entity.User;
import com.aideception.educator.repository.ScenarioAttemptRepository;
import com.aideception.educator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ScenarioAttemptRepository attemptRepository;
    
    @Autowired
    private VulnerabilityProfileService vulnerabilityProfileService;
    
    public List<StudentProgressDTO> getStudentProgress(Long teacherId) {
        List<User> students = userRepository.findAll().stream()
            .filter(u -> u.getRole() == User.UserRole.STUDENT && 
                        u.getTeacherId() != null && 
                        u.getTeacherId().equals(teacherId))
            .collect(Collectors.toList());
        
        return students.stream()
            .map(student -> {
                StudentProgressDTO dto = new StudentProgressDTO();
                dto.setStudentId(student.getId());
                dto.setStudentName(student.getFirstName() + " " + student.getLastName());
                dto.setStudentEmail(student.getEmail());
                
                Long totalAttempts = attemptRepository.countByUserId(student.getId());
                Long correctAttempts = attemptRepository.countCorrectByUserId(student.getId());
                
                dto.setTotalAttempts(totalAttempts.intValue());
                dto.setCorrectAttempts(correctAttempts.intValue());
                dto.setAccuracy(totalAttempts > 0 ? (double) correctAttempts / totalAttempts * 100 : 0.0);
                
                try {
                    VulnerabilityProfileDTO profile = vulnerabilityProfileService.getProfileByUsername(student.getUsername());
                    dto.setVulnerabilityProfile(profile);
                } catch (Exception e) {
                }
                
                List<ScenarioAttemptDTO> recentAttempts = attemptRepository.findByUser_Id(student.getId()).stream()
                    .limit(5)
                    .map(attempt -> {
                        ScenarioAttemptDTO attemptDto = new ScenarioAttemptDTO();
                        attemptDto.setId(attempt.getId());
                        attemptDto.setUserId(attempt.getUser().getId());
                        attemptDto.setScenarioId(attempt.getScenario().getId());
                        attemptDto.setUserAnswer(attempt.getUserAnswer());
                        attemptDto.setIsCorrect(attempt.getIsCorrect());
                        attemptDto.setTimeSpentSeconds(attempt.getTimeSpentSeconds());
                        attemptDto.setAttemptedAt(attempt.getAttemptedAt());
                        return attemptDto;
                    })
                    .collect(Collectors.toList());
                
                dto.setRecentAttempts(recentAttempts);
                
                return dto;
            })
            .collect(Collectors.toList());
    }
}
