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
    List<TripMember> findByUserId(int userId);
    List<TripMember> findAllByTripId(int tripId);

    Optional<TripMember> findByTripIdAndUserIdAndRole(int tripId, int userId, String role);
    void deleteByTripIdAndRole(Integer tripId, String role);

}