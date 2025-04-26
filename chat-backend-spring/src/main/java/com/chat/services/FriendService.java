package com.chat.services;

import com.chat.dto.Friend;
import com.chat.entities.User;
import com.chat.entities.UserFriend;
import com.chat.repositories.UserFriendRepository;
import com.chat.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FriendService {

    @Autowired
    private UserFriendRepository userFriendRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Friend> getFriendList(int userId) {
        List<UserFriend> friendships = userFriendRepository.findByUserIdOrFriendId(userId, userId);
        List<Friend> friends = new ArrayList<>();

        for (UserFriend friendship : friendships) {
            int friendId = (friendship.getUserId() == userId) ? friendship.getFriendId() : friendship.getUserId();
            Optional<User> friendUserOpt = userRepository.findById(friendId);

            friendUserOpt.ifPresent(friendUser -> {
                friends.add(new Friend(
                        friendUser.getId(),
                        friendUser.getUsername(),
                        friendUser.getGender(),
                        friendUser.getEmail()
                ));
            });
        }

        return friends;
    }

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
