package com.wanderstudio.services;

import com.wanderstudio.dto.Friend;
import com.wanderstudio.entities.UserFriend;
import com.wanderstudio.repositories.UserFriendRepository;
import com.wanderstudio.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FriendService {

    @Autowired
    private UserFriendRepository userFriendRepository;

    @Autowired
    private UserRepository userRepository;


    public Page<Friend> getPagedFriendList(int userId, Pageable pageable) {
        return userFriendRepository.findPagedFriendsByUserId(userId, pageable);
    }
//    public List<Friend> getFriendList(int userId) {
//        List<UserFriend> friendships = userFriendRepository.findByUserIdOrFriendId(userId, userId);
//        List<Friend> friends = new ArrayList<>();
//
//        for (UserFriend friendship : friendships) {
//            int friendId = (friendship.getUserId() == userId) ? friendship.getFriendId() : friendship.getUserId();
//            Optional<User> friendUserOpt = userRepository.findById(friendId);
//
//            friendUserOpt.ifPresent(friendUser -> {
//                friends.add(new Friend(
//                        friendUser.getId(),
//                        friendUser.getUsername(),
//                        friendUser.getGender(),
//                        friendUser.getEmail()
//                ));
//            });
//        }
//
//        return friends;
//    }

    public boolean removeFriend(int userId, int friendId) {
        // Check for friendship
        Optional<UserFriend> friendshipOpt = userFriendRepository.findFriendshipBetweenUsers(userId, friendId);

        if (friendshipOpt.isPresent()) {
            userFriendRepository.delete(friendshipOpt.get());
            return true;
        } else {
            return false; // No friendship found
        }
    }

}
