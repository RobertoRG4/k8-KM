package com.api.controllers;

import com.api.dao.LoginDao;
import com.api.entity.Login;
import com.api.utils.ApiResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1")
public class LoginController {

    @Autowired
    private LoginDao loginDao;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<String>> credentials(@RequestBody Login credentials, HttpServletResponse response) {

        if (credentials.getUsername().trim().isEmpty() || credentials.getPassword().trim().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse<>("Bad Credentials",LocalDateTime.now(),HttpStatus.BAD_REQUEST.value()),HttpStatus.BAD_REQUEST);
        }

        if (credentials.getUsername().equals("admin")&& credentials.getPassword().equals("admin")) {
            String token = "jwt_token_simulado";
            Cookie cookie = new Cookie("auth_token", token);
            cookie.setMaxAge(60 * 60 * 24 * 7);
            cookie.setSecure(true);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);
            return new ResponseEntity<>(new ApiResponse<>("Login successfully",LocalDateTime.now(),HttpStatus.OK.value()),HttpStatus.OK);

        } else {
            return new ResponseEntity<>(new ApiResponse<>("Unauthorized",LocalDateTime.now(),HttpStatus.UNAUTHORIZED.value()),HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("auth_token", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);

        response.addCookie(cookie);

        return new ResponseEntity<>(new ApiResponse<>("Logged out successfully",LocalDateTime.now(),HttpStatus.OK.value()),HttpStatus.OK);
    }
}


