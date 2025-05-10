package com.chat.repositories;

import com.chat.entities.TripPlace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripPlaceRepository extends JpaRepository<TripPlace, Integer> {
    List<TripPlace> findAllByTripId(int tripId);
}