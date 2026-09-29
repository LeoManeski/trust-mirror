package com.aideception.educator.service;

import com.aideception.educator.dto.AuthResponse;
import com.aideception.educator.dto.LoginRequest;
import com.aideception.educator.dto.RegisterRequest;
import com.aideception.educator.entity.User;
import com.aideception.educator.entity.VulnerabilityProfile;
import com.aideception.educator.repository.UserRepository;
import com.aideception.educator.repository.VulnerabilityProfileRepository;
import com.aideception.educator.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private VulnerabilityProfileRepository vulnerabilityProfileRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(User.UserRole.valueOf(request.getRole().toUpperCase()));
        user.setTeacherId(request.getTeacherId());
        
        user = userRepository.save(user);
        
        if (user.getRole() == User.UserRole.STUDENT) {
            VulnerabilityProfile profile = new VulnerabilityProfile();
            profile.setUser(user);
            vulnerabilityProfileRepository.save(profile);
        }
        
        String token = jwtUtil.generateToken(user.getUsername());
        
        return new AuthResponse(
            token,
            user.getUsername(),
            user.getEmail(),
            user.getRole(),
            user.getId(),
            user.getTeacherId()
        );
    }
    
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        
        User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getUsername());
        
        return new AuthResponse(
            token,
            user.getUsername(),
            user.getEmail(),
            user.getRole(),
            user.getId(),
            user.getTeacherId()
        );
    }
}
