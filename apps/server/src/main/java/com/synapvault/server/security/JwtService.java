package com.synapvault.server.security;

import com.synapvault.server.user.AppUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtService {

    private final String secret;
    private final long expirationMs;

    public JwtService(
        @Value("${app.jwt.secret}") String secret,
        @Value("${app.jwt.expiration-ms}") long expirationMs
    ) {
        this.secret = secret;
        this.expirationMs = expirationMs;
    }

    public String generateToken(AppUser user) {
        Date issuedAt = new Date();
        Date expiration = new Date(issuedAt.getTime() + expirationMs);

        Map<String, Object> claims = Map.of(
            "userId", user.getId().toString(),
            "name", user.getName(),
            "role", user.getRole().name()
        );

        return Jwts.builder()
            .claims(claims)
            .subject(user.getEmail())
            .issuedAt(issuedAt)
            .expiration(expiration)
            .signWith(getSigningKey())
            .compact();
    }

    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    public UUID extractUserId(String token) {
        String userId = extractAllClaims(token).get("userId", String.class);
        return UUID.fromString(userId);
    }

    public boolean isTokenValid(String token, AppUser user) {
        String email = extractEmail(token);

        return email.equalsIgnoreCase(user.getEmail())
            && !isTokenExpired(token)
            && user.isEnabled();
    }

    public long getExpirationSeconds() {
        return expirationMs / 1000;
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token)
            .getExpiration()
            .before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private SecretKey getSigningKey() {
        try {
            byte[] decodedKey = Decoders.BASE64.decode(secret);
            return Keys.hmacShaKeyFor(decodedKey);
        } catch (IllegalArgumentException exception) {
            return Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
            );
        }
    }
}