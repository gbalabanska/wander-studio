package com.chat.repositories;

import com.chat.entities.TripMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TripMemberRepository extends JpaRepository<TripMember, Integer> {

    boolean existsByTripIdAndUserId(int tripId, int userId);

    List<TripMember> findAllByTripId(int tripId);

    Optional<TripMember> findByTripIdAndUserIdAndRole(int tripId, int userId, String role);

    // This method is used in the updateTrip method to remove members excluding the owner
    @Modifying
    @Query("DELETE FROM TripMember tm WHERE tm.tripId = :tripId AND tm.userId != :userId AND tm.role = 'MEMBER'")
    void deleteByTripIdExceptOwner(@Param("tripId") int tripId, @Param("userId") int userId);
}