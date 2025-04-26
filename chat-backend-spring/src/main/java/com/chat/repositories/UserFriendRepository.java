package com.chat.repositories;

import com.chat.entities.UserFriend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFriendRepository extends JpaRepository<UserFriend, Integer>, UserFriendCustomRepository {

    // Custom query to find if a friendship exists between two users
    boolean existsByUserIdAndFriendId(int userId, int friendId);


    List<UserFriend> findByUserIdOrFriendId(int userId, int friendId);

//    @Query("SELECT uf FROM UserFriend uf WHERE uf.userId = :userId OR uf.friendId = :userId")
//    List<UserFriend> findFriendshipsByUserId(@Param("userId") int userId);

    // Check if two users are friends
    @Query("SELECT uf FROM UserFriend uf WHERE (uf.userId = :userId AND uf.friendId = :friendId) OR (uf.userId = :friendId AND uf.friendId = :userId)")
    Optional<UserFriend> findFriendshipBetweenUsers(@Param("userId") int userId, @Param("friendId") int friendId);

}
