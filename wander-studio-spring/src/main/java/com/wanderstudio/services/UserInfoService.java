package com.wanderstudio.services;

import com.wanderstudio.dto.*;
import com.wanderstudio.entities.User;
import com.wanderstudio.errors.UsernameAlreadyExistsException;
import com.wanderstudio.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userDetail = repository.findByUsername(username);

        // Converting UserInfo to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    // In your UserInfoService class
    public User addUser(User userInfo) {
        // Check if the username is already taken
        if (repository.existsByUsername(userInfo.getUsername())) {
            // Throw an exception for the specific error
            throw new UsernameAlreadyExistsException("Username '" + userInfo.getUsername() + "' is already taken.");
        }

        // Encode password before saving the user
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        return repository.save(userInfo); // Return the saved entity
    }
}