package com.wanderstudio.repositories;

import com.wanderstudio.dto.Friend;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserFriendCustomRepository {
    Page<Friend> findPagedFriendsByUserId(int userId, Pageable pageable);
}
