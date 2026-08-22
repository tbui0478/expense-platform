package com.bui.expense_platform.service;

import com.bui.expense_platform.dto.AuthRequest;
import com.bui.expense_platform.dto.AuthResponse;
import com.bui.expense_platform.model.User;
import com.bui.expense_platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public AuthResponse register(AuthRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return AuthResponse.builder().success(false).message("Email is required").build();
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return AuthResponse.builder().success(false).message("Password is required").build();
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            return AuthResponse.builder().success(false).message("An account with this email already exists").build();
        }

        User user = User.builder()
                .fullName(request.getFullName() != null && !request.getFullName().isBlank() ? request.getFullName() : "ExpenTrack User")
                .email(request.getEmail().trim().toLowerCase())
                .password(request.getPassword()) // In demo app, stored directly in database table 'users'
                .build();

        User savedUser = userRepository.save(user);

        return AuthResponse.builder()
                .success(true)
                .message("Registration successful")
                .userId(savedUser.getId())
                .fullName(savedUser.getFullName())
                .email(savedUser.getEmail())
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return AuthResponse.builder().success(false).message("Email and password are required").build();
        }

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail().trim().toLowerCase());
        if (userOpt.isEmpty()) {
            return AuthResponse.builder().success(false).message("No account found with this email").build();
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(request.getPassword())) {
            return AuthResponse.builder().success(false).message("Invalid password").build();
        }

        return AuthResponse.builder()
                .success(true)
                .message("Login successful")
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .build();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
