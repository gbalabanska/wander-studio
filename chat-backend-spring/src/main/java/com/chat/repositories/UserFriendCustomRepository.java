package com.chat.repositories;

import com.chat.dto.Friend;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserFriendCustomRepository {
    Page<Friend> findPagedFriendsByUserId(int userId, Pageable pageable);
}
