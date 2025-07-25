package com.wanderstudio.services;

import com.wanderstudio.dto.UserDTO;
import com.wanderstudio.entities.User;
import com.wanderstudio.entities.UserFriend;
import com.wanderstudio.repositories.UserFriendRepository;
import com.wanderstudio.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserFriendRepository userFriendRepository;

//    public List<UserDTO> getAllUsers() {
//        return userRepository.findAll();
//    }

    // Method to add a friend
    public boolean addFriend(int userId, int friendId) {
        // Check if the user already has this friend
        if (userFriendRepository.existsByUserIdAndFriendId(userId, friendId) ||
                userFriendRepository.existsByUserIdAndFriendId(friendId, userId)) {
            return false;  // Friendship already exists
        }

        // Create a new UserFriend entity and save it
        UserFriend userFriend = new UserFriend();
        userFriend.setUserId(userId);
        userFriend.setFriendId(friendId);
        userFriendRepository.save(userFriend);

        return true;
    }
    public int getUserIdByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get().getId();  // Assuming the User entity has an 'id' field
        }
        throw new IllegalArgumentException("User not found with username: " + username);
    }
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<UserDTO> getUserDTOByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getGender(),
                        user.getEmail()
                ));
    }

}
