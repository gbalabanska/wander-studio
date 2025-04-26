package com.chat.controllers;

import com.chat.dto.ApiResponse;
import com.chat.dto.Friend;
import com.chat.services.FriendService;
import com.chat.util.CookieExtractor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendsController {


    @Autowired
    CookieExtractor cookieExtractor;
    @Autowired
    FriendService friendService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<List<Friend>>> getFriendListForUser(HttpServletRequest request) {
        int userId = cookieExtractor.extractUserId(request);
        List<Friend> friends = friendService.getFriendList(userId);
        return ResponseEntity.ok(new ApiResponse<>(friends, "Friend list retrieved successfully."));
    }

    @DeleteMapping("/{friendId}")
    public ResponseEntity<ApiResponse<String>> deleteFriend(@PathVariable int friendId, HttpServletRequest request) {
        int userId = cookieExtractor.extractUserId(request);
        boolean deleted = friendService.removeFriend(userId, friendId);

        if (deleted) {
            return ResponseEntity.ok(new ApiResponse<>("Friend deleted successfully."));
        } else {
            return ResponseEntity.status(400).body(new ApiResponse<>(null, "Friend not found or could not be deleted."));
        }
    }

}