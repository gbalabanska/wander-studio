package com.chat.controllers;

import com.chat.dto.AddNewUserRequest;
import com.chat.dto.ApiResponse;
import com.chat.dto.AuthRequest;
import com.chat.entities.User;
import com.chat.services.JwtService;
import com.chat.services.UserInfoService;
import com.chat.util.CookieExtractor;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthUserController {
    @Autowired
    CookieExtractor cookieExtractor;
    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public ResponseEntity<Map<String, String>> welcome(HttpServletRequest request) {
        // Retrieve the token from the cookie
        String token = null;
        String username = null;

        // Look for the "token" cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    username = jwtService.extractUsername(token);  // Extract username from the token
                    break;
                }
            }
        }

        if (token == null || !jwtService.validateToken(token, service.loadUserByUsername(username))) {
            throw new IllegalArgumentException("Invalid or missing token");
        }

        // Get expiration date or other token info
        Date expirationDate = jwtService.extractExpiration(token);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome user " + username + ". Your token will expire at " + expirationDate);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/addNewUser")
    public ResponseEntity<Map<String, String>> addNewUser(@Valid @RequestBody AddNewUserRequest newUserDTO) {
        User newUser = new User();
        newUser.setUsername(newUserDTO.getUsername());
        newUser.setEmail(newUserDTO.getEmail());
        newUser.setGender(newUserDTO.getGender());
        newUser.setPassword(newUserDTO.getPassword());
        newUser.setRoles("ROLE_USER");

        String result = service.addUser(newUser);

        // Create a map to return as JSON response
        Map<String, String> response = new HashMap<>();
        response.put("message", result);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/generateToken")
    public ResponseEntity<ApiResponse<Map<String, Object>>> authenticateAndGetToken(
            @RequestBody AuthRequest authRequest,
            HttpServletResponse response
    ) {
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(authRequest.getUsername());

            // Create cookie
            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(30 * 60); // 30 minutes

            response.addCookie(cookie);

            // Calculate times
            long currentMillis = System.currentTimeMillis();
            long expirationMillis = currentMillis + (30 * 60 * 1000); // 30 min in ms

            // Prepare response body
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("message", "Authentication successful. Token stored in cookie.");
            responseBody.put("issuedAt", currentMillis);
            responseBody.put("expiresAt", expirationMillis);

            return ResponseEntity.ok(new ApiResponse<>(responseBody, "Login successful"));
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @PostMapping("/refreshToken/{username}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> refreshToken(@PathVariable String username, HttpServletResponse response) {

        String refreshToken = jwtService.generateToken(username);

        Cookie newCookie = new Cookie("token", refreshToken);
        newCookie.setHttpOnly(true);
        newCookie.setSecure(true);
        newCookie.setPath("/");
        newCookie.setMaxAge(30 * 60); // 30 minutes
        response.addCookie(newCookie);

        Map<String, Object> data = new HashMap<>();
        data.put("message", "Token refreshed");
        data.put("issuedAt", System.currentTimeMillis());
        data.put("expiresAt", System.currentTimeMillis() + 30 * 60 * 1000);

        return ResponseEntity.ok(new ApiResponse<>(data, "Token refreshed successfully", true));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletResponse response) {
        // Create a cookie with the same name as the JWT cookie
        Cookie cookie = new Cookie("token", null); // Set value to null to clear it
        cookie.setHttpOnly(true);                  // Ensure HttpOnly is set
        cookie.setSecure(true);                    // Ensure Secure is set
        cookie.setPath("/");                       // Match the original path
        cookie.setMaxAge(0);                       // Set cookie to expire immediately
        response.addCookie(cookie);                // Add the expired cookie to the response

        ApiResponse<String> apiResponse = new ApiResponse<>("You have been logged out successfully.");
        return ResponseEntity.ok(apiResponse);
    }


}