package com.wanderstudio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    UserDTO user;
    private long issuedAt;
    private long expiresAt;
}
