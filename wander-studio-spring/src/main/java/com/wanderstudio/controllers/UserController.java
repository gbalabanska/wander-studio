package com.wanderstudio.controllers;

import com.wanderstudio.dto.ApiResponse;
import com.wanderstudio.dto.UserDTO;
import com.wanderstudio.entities.User;
import com.wanderstudio.services.UserService;
import com.wanderstudio.util.CookieExtractor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    CookieExtractor cookieExtractor;

//    @GetMapping
//    public List<UserDTO> getAllUsers() {
//        return userService.getAllUsers();
//    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username, HttpServletRequest request) {
        Optional<UserDTO> user = userService.getUserDTOByUsername(username);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PostMapping("/addFriend/{id}")
    public ResponseEntity<ApiResponse<String>> addFriend(@PathVariable int id, HttpServletRequest request) {
        // Get the username from the token (extracted from cookies)
        String username = cookieExtractor.extractUsername(request);
        System.out.println("----------------- addFriend for user: " + username);

        // Get the user who is sending the friend request
        Optional<User> requestingUserOptional = userService.getUserByUsername(username);

        if (!requestingUserOptional.isPresent()) {
            return ResponseEntity
                    .status(404)
                    .body(new ApiResponse<>(null, "User not found"));
        }

        User requestingUser = requestingUserOptional.get();
        int requestingUserId = requestingUser.getId();

        // Add the friend
        boolean isFriendAdded = userService.addFriend(requestingUserId, id);

        if (isFriendAdded) {
            return ResponseEntity
                    .ok(new ApiResponse<>("Friend added successfully"));
        } else {
            return ResponseEntity
                    .status(400)
                    .body(new ApiResponse<>(null, "You are already friends with this user"));
        }
    }


}
