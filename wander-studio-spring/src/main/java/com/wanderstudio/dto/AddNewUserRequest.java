package com.wanderstudio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddNewUserRequest {

    private String username;
    private String email;
    private String password;
    private String gender; //M, F, O
}