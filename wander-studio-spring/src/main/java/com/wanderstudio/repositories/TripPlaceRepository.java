package com.wanderstudio.repositories;

import com.wanderstudio.entities.TripPlace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripPlaceRepository extends JpaRepository<TripPlace, Integer> {
    List<TripPlace> findAllByTripId(int tripId);

    void deleteAllByTripId(int tripId);

}