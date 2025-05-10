package com.chat.services;

import com.chat.dto.TripDto;
import com.chat.entities.Trip;
import com.chat.entities.TripMember;
import com.chat.entities.TripPlace;
import com.chat.repositories.TripMemberRepository;
import com.chat.repositories.TripPlaceRepository;
import com.chat.repositories.TripRepository;
import com.chat.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final TripMemberRepository tripMemberRepository;
    private final TripPlaceRepository tripPlaceRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createTrip(TripDto request, Integer currentUserId) {
        // 1. Save trip
        Trip trip = Trip.builder()
                .name(request.getName())
                .dateFrom(request.getDateFrom())
                .dateTo(request.getDateTo())
                .tripEmoji(request.getTripEmoji())
                .description(request.getDescription())
                .build();

        Trip savedTrip = tripRepository.save(trip);

        // 2. Save owner
        tripMemberRepository.save(TripMember.builder()
                .tripId(savedTrip.getId())
                .userId(currentUserId)
                .role("OWNER")
                .build());

        // 3. Save invited members
        for (Integer friendId : request.getFriendIds()) {
            tripMemberRepository.save(TripMember.builder()
                    .tripId(savedTrip.getId())
                    .userId(friendId)
                    .role("MEMBER")
                    .build());
        }

        // 4. Save places with order
        int order = 0;
        for (TripDto.PlaceDTO place : request.getPlaces()) {
            tripPlaceRepository.save(TripPlace.builder()
                    .tripId(savedTrip.getId())
                    .address(place.getAddress())
                    .latitude(place.getLatitude())
                    .longitude(place.getLongitude())
                    .placeOrder(order++)
                    .build());
        }
    }

//    public List<TripDto> getTripsForUser(int userId) {
//        List<Trip> trips = tripRepository.findAllByUserId(userId);
//        return trips.stream()
//                .map(this::mapToDto)
//                .collect(Collectors.toList());
//    }

    public TripDto getTripByIdForUser(int tripId, int userId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        boolean isMember = tripMemberRepository.existsByTripIdAndUserId(tripId, userId);
        if (!isMember) {
            throw new RuntimeException("Access denied");
        }

        return mapToDto(trip);
    }

//    @Transactional
//    public void updateTrip(int tripId, TripDto request, int userId) {
//        Trip trip = tripRepository.findById(tripId)
//                .orElseThrow(() -> new RuntimeException("Trip not found"));
//
//        TripMember owner = tripMemberRepository.findByTripIdAndUserIdAndRole(tripId, userId, "OWNER")
//                .orElseThrow(() -> new RuntimeException("Only the owner can update the trip"));
//
//        // Update trip entity
//        trip.setName(request.getName());
//        trip.setDateFrom(request.getDateFrom());
//        trip.setDateTo(request.getDateTo());
//        trip.setDescription(request.getDescription());
//        trip.setTripEmoji(request.getTripEmoji());
//        tripRepository.save(trip);
//
//        // Update places
//        tripPlaceRepository.deleteAllByTripId(tripId);
//        for (int i = 0; i < request.getPlaces().size(); i++) {
//            var p = request.getPlaces().get(i);
//            TripPlace place = new TripPlace();
//            place.setTrip(trip);
//            place.setAddress(p.getAddress());
//            place.setLatitude(p.getLatitude());
//            place.setLongitude(p.getLongitude());
//            place.setPlaceOrder(i);
//            tripPlaceRepository.save(place);
//        }
//
//        // Update members (excluding owner)
//        tripMemberRepository.deleteByTripIdExceptOwner(tripId, userId);
//        for (Integer friendId : request.getFriendIds()) {
//            TripMember member = new TripMember();
//            member.setTrip(trip);
//            member.setUser(userRepository.findById(friendId).orElseThrow());
//            member.setRole("MEMBER");
//            tripMemberRepository.save(member);
//        }
//    }
//
//    @Transactional
//    public void deleteTrip(int tripId, int userId) {
//        TripMember owner = tripMemberRepository.findByTripIdAndUserIdAndRole(tripId, userId, "OWNER")
//                .orElseThrow(() -> new RuntimeException("Only the owner can delete the trip"));
//        tripRepository.deleteById(tripId);
//    }

    // You likely already have this, but here's a simple DTO mapping method:
    private TripDto mapToDto(Trip trip) {
        // Get places
        List<TripPlace> places = tripPlaceRepository.findAllByTripId(trip.getId());
        List<TripDto.PlaceDTO> placeDTOs = places.stream()
                .map(place -> TripDto.PlaceDTO.builder()
                        .address(place.getAddress())
                        .latitude(place.getLatitude())
                        .longitude(place.getLongitude())
                        .build())
                .collect(Collectors.toList());

        // Get members excluding the owner
        List<Integer> friendIds = tripMemberRepository.findAllByTripId(trip.getId()).stream()
                .filter(member -> !"OWNER".equals(member.getRole()))
                .map(TripMember::getUserId)
                .collect(Collectors.toList());

        return TripDto.builder()
                .id(trip.getId())
                .name(trip.getName())
                .dateFrom(trip.getDateFrom())
                .dateTo(trip.getDateTo())
                .tripEmoji(trip.getTripEmoji())
                .description(trip.getDescription())
                .friendIds(friendIds)
                .places(placeDTOs)
                .build();
    }

}
