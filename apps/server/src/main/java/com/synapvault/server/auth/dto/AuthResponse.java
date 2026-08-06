package com.synapvault.server.auth.dto;

import com.synapvault.server.user.AppUser;

import java.util.UUID;

public record AuthResponse(
    String accessToken,
    String tokenType,
    long expiresIn,
    UserResponse user
) {

    public static AuthResponse from(
        String accessToken,
        long expiresIn,
        AppUser user
    ) {
        return new AuthResponse(
            accessToken,
            "Bearer",
            expiresIn,
            new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
            )
        );
    }

    public record UserResponse(
        UUID id,
        String name,
        String email,
        String role
    ) {
    }
}