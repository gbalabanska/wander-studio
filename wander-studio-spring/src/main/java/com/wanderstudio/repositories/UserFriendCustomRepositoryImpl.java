package com.wanderstudio.repositories;

import com.wanderstudio.dto.Friend;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserFriendCustomRepositoryImpl implements UserFriendCustomRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Friend> findPagedFriendsByUserId(int userId, Pageable pageable) {
        // Create the query string for fetching friends by userId or friendId
        String queryStr = """
            SELECT new com.wanderstudio.dto.Friend(u.id, u.username, u.gender, u.email)
            FROM UserFriend uf
            JOIN User u ON 
                (uf.userId = :userId AND uf.friendId = u.id) 
                OR 
                (uf.friendId = :userId AND uf.userId = u.id)
        """;

        // Create the TypedQuery
        TypedQuery<Friend> query = entityManager.createQuery(queryStr, Friend.class);
        query.setParameter("userId", userId);

        // Set pagination properties
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        // Execute the query to get the results
        List<Friend> resultList = query.getResultList();

        // Count query to calculate the total number of friends (needed for pagination)
        String countQueryStr = """
            SELECT COUNT(u.id)
            FROM UserFriend uf
            JOIN User u ON 
                (uf.userId = :userId AND uf.friendId = u.id) 
                OR 
                (uf.friendId = :userId AND uf.userId = u.id)
        """;

        TypedQuery<Long> countQuery = entityManager.createQuery(countQueryStr, Long.class);
        countQuery.setParameter("userId", userId);
        Long totalCount = countQuery.getSingleResult();

        // Return the paginated results as a Page object
        return new PageImpl<>(resultList, pageable, totalCount);
    }
}
