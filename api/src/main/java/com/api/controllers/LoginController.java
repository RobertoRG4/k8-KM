package com.api.controllers;

import com.api.entity.Login;
import com.api.utils.ApiResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1")
public class LoginController {
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> credentials(@RequestBody Login credentials, HttpServletResponse response) {
        if (credentials.getUsername().trim().isEmpty() || credentials.getPassword().trim().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse<>("Bad Credentials", LocalDateTime.now(), 400), HttpStatus.BAD_REQUEST);
        } else {
            String token = "jwt_token_simulado";
            Cookie cookie = new Cookie("auth_token", token);
            cookie.setMaxAge(60 * 60 * 24 * 7);
            cookie.setSecure(true);
            cookie.setHttpOnly(true);
            cookie.setPath("/");

            response.addCookie(cookie);
            return new ResponseEntity<>(new ApiResponse<>("Accepted", LocalDateTime.now(), 200), HttpStatus.OK);
        }
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("auth_token", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);

        response.addCookie(cookie);

        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }
}
