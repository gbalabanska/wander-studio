package com.wanderstudio.controllers;

import com.wanderstudio.dto.ApiResponse;
import com.wanderstudio.dto.Friend;
import com.wanderstudio.dto.PagedResponse;
import com.wanderstudio.services.FriendService;
import com.wanderstudio.util.CookieExtractor;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/friends")
public class FriendsController {

    @Autowired
    CookieExtractor cookieExtractor;
    @Autowired
    FriendService friendService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<PagedResponse<Friend>>> getFriendListForUser(
            HttpServletRequest request,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        int userId = cookieExtractor.extractUserId(request);
        Pageable pageable = PageRequest.of(page, size);

        Page<Friend> friendsPage = friendService.getPagedFriendList(userId, pageable);

        PagedResponse<Friend> pagedResponse = new PagedResponse<>(
                friendsPage.getContent(),
                friendsPage.getNumber(),
                friendsPage.getSize(),
                friendsPage.getTotalPages(),
                friendsPage.getTotalElements()
        );

        return ResponseEntity.ok(new ApiResponse<>(pagedResponse, "Friend list retrieved successfully."));
    }

//    @GetMapping("")
//    public ResponseEntity<ApiResponse<List<Friend>>> getFriendListForUser(HttpServletRequest request) {
//        int userId = cookieExtractor.extractUserId(request);
//        List<Friend> friends = friendService.getFriendList(userId);
//        return ResponseEntity.ok(new ApiResponse<>(friends, "Friend list retrieved successfully."));
//    }

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