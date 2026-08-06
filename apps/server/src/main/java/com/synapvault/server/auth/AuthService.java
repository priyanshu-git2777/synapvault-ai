package com.synapvault.server.auth;

import com.synapvault.server.auth.dto.AuthResponse;
import com.synapvault.server.auth.dto.LoginRequest;
import com.synapvault.server.auth.dto.RegisterRequest;
import com.synapvault.server.security.JwtService;
import com.synapvault.server.user.AppUser;
import com.synapvault.server.user.Role;
import com.synapvault.server.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = normalizeEmail(request.email());

        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new IllegalArgumentException(
                "An account already exists with this email."
            );
        }

        AppUser user = AppUser.builder()
            .name(request.name().trim())
            .email(normalizedEmail)
            .password(passwordEncoder.encode(request.password()))
            .role(Role.USER)
            .enabled(true)
            .build();

        AppUser savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser);

        return AuthResponse.from(
            token,
            jwtService.getExpirationSeconds(),
            savedUser
        );
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = normalizeEmail(request.email());

        AppUser user = userRepository
            .findByEmailIgnoreCase(normalizedEmail)
            .orElseThrow(() ->
                new BadCredentialsException("Invalid email or password.")
            );

        if (
            !user.isEnabled()
                || !passwordEncoder.matches(
                    request.password(),
                    user.getPassword()
                )
        ) {
            throw new BadCredentialsException(
                "Invalid email or password."
            );
        }

        String token = jwtService.generateToken(user);

        return AuthResponse.from(
            token,
            jwtService.getExpirationSeconds(),
            user
        );
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}