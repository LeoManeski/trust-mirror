package com.aideception.educator.dto;

import com.aideception.educator.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String username;
    private String email;
    private User.UserRole role;
    private Long userId;
    private Long teacherId;
}
