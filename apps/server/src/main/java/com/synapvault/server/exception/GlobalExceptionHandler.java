package com.synapvault.server.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(
        MethodArgumentNotValidException exception,
        HttpServletRequest request
    ) {
        Map<String, String> fieldErrors = new LinkedHashMap<>();

        exception
            .getBindingResult()
            .getFieldErrors()
            .forEach(error ->
                fieldErrors.putIfAbsent(
                    error.getField(),
                    error.getDefaultMessage()
                )
            );

        ApiError response = new ApiError(
            Instant.now(),
            HttpStatus.BAD_REQUEST.value(),
            HttpStatus.BAD_REQUEST.getReasonPhrase(),
            "One or more fields are invalid.",
            request.getRequestURI(),
            fieldErrors
        );

        return ResponseEntity
            .badRequest()
            .body(response);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiError> handleBadCredentials(
        BadCredentialsException exception,
        HttpServletRequest request
    ) {
        return buildResponse(
            HttpStatus.UNAUTHORIZED,
            exception.getMessage(),
            request
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleIllegalArgument(
        IllegalArgumentException exception,
        HttpServletRequest request
    ) {
        return buildResponse(
            HttpStatus.CONFLICT,
            exception.getMessage(),
            request
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleUnexpectedError(
        Exception exception,
        HttpServletRequest request
    ) {
        exception.printStackTrace();

        return buildResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "An unexpected server error occurred.",
            request
        );
    }

    private ResponseEntity<ApiError> buildResponse(
        HttpStatus status,
        String message,
        HttpServletRequest request
    ) {
        ApiError response = new ApiError(
            Instant.now(),
            status.value(),
            status.getReasonPhrase(),
            message,
            request.getRequestURI(),
            null
        );

        return ResponseEntity
            .status(status)
            .body(response);
    }
}