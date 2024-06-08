package com.blog.controllers;

import com.blog.auth.AuthenticationResponse;
import com.blog.auth.LoginRequest;
import com.blog.auth.RegisterRequest;
import com.blog.exceptions.EmailAlreadyExists;
import com.blog.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) throws EmailAlreadyExists {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/check-auth")
    public ResponseEntity<Boolean> checkToken() {
        return ResponseEntity.ok(true);
    }

    @ExceptionHandler
    public ResponseEntity<String> handleEmailAlreadyExists(EmailAlreadyExists emailAlreadyExists) {
        return new ResponseEntity<>(emailAlreadyExists.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
