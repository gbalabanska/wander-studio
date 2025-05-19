package com.chat.services;

import com.chat.dto.TripDto;
import com.chat.entities.Trip;
import com.chat.entities.TripMember;
import com.chat.entities.TripPlace;
import com.chat.errors.UnauthorizedTripAccessException;
import com.chat.repositories.TripMemberRepository;
import com.chat.repositories.TripPlaceRepository;
import com.chat.repositories.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final TripMemberRepository tripMemberRepository;
    private final TripPlaceRepository tripPlaceRepository;

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

        // 2. Save owner as a TripMember
        tripMemberRepository.save(TripMember.builder()
                .trip(savedTrip)  // Setting the Trip object directly
                .userId(currentUserId)
                .role("OWNER")
                .build());

        // 3. Save invited members as TripMembers
        for (Integer friendId : request.getFriendIds()) {
            tripMemberRepository.save(TripMember.builder()
                    .trip(savedTrip)  // Setting the Trip object directly
                    .userId(friendId)
                    .role("MEMBER")
                    .build());
        }

        // 4. Save places with order
        int order = 0;
        for (TripDto.PlaceDTO place : request.getPlaces()) {
            tripPlaceRepository.save(TripPlace.builder()
                    .trip(savedTrip)  // Setting the Trip object directly
                    .address(place.getAddress())
                    .latitude(place.getLatitude())
                    .longitude(place.getLongitude())
                    .placeOrder(order++)
                    .build());
        }
    }

    public List<TripDto> getTripsForUser(int userId) {
        // Get all trips where the user is
        List<TripMember> tripMembers = tripMemberRepository.findByUserId(userId);

        // Get trips related to the user
        List<Trip> trips = tripMembers.stream()
                .map(TripMember::getTrip)  // Extract the Trip object from each TripMember
                .distinct()  // Ensure there are no duplicates (in case a user is part of multiple roles)
                .toList();

        // Map each trip to a DTO
        return trips.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }


    public TripDto getTripByIdForUser(int tripId, int userId) {
        Optional<Trip> tripOptional = tripRepository.findById(tripId);

        if (tripOptional.isEmpty()) {
            return null; // or return new ApiResponse<>(null, "Trip not found", false);
        }

        Trip trip = tripOptional.get();

        boolean isMember = tripMemberRepository.existsByTripIdAndUserId(tripId, userId);

        if (!isMember) {
            throw new RuntimeException("Access denied");
        }

        return mapToDto(trip);
    }

    @Transactional
    public void updateTrip(int tripId, TripDto request, int userId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));

        // Check ownership
        TripMember owner = tripMemberRepository.findByTripIdAndUserIdAndRole(tripId, userId, "OWNER")
                .orElseThrow(() -> new RuntimeException("Only the owner can update the trip"));

        // Update trip entity
        trip.setName(request.getName());
        trip.setDateFrom(request.getDateFrom());
        trip.setDateTo(request.getDateTo());
        trip.setDescription(request.getDescription());
        trip.setTripEmoji(request.getTripEmoji());

        // Clear and re-add places
        trip.getPlaces().clear();
        for (int i = 0; i < request.getPlaces().size(); i++) {
            var p = request.getPlaces().get(i);
            TripPlace place = TripPlace.builder()
                    .trip(trip)
                    .address(p.getAddress())
                    .latitude(p.getLatitude())
                    .longitude(p.getLongitude())
                    .placeOrder(i)
                    .build();
            trip.getPlaces().add(place);
        }

        // --- ✅ KEY FIX: Delete all existing members (including OWNER) ---
        tripMemberRepository.deleteByTripId(tripId);

        // Re-add OWNER
        TripMember newOwner = TripMember.builder()
                .trip(trip)
                .userId(userId)
                .role("OWNER")
                .build();
        trip.getMembers().add(newOwner);

        // Re-add members (excluding OWNER)
        for (Integer friendId : request.getFriendIds()) {
            if (!friendId.equals(userId)) {
                TripMember member = TripMember.builder()
                        .trip(trip)
                        .userId(friendId)
                        .role("MEMBER")
                        .build();
                trip.getMembers().add(member);
            }
        }

        tripRepository.save(trip);
    }


    @Transactional
    public void deleteTrip(int tripId, int userId) {
        TripMember owner = tripMemberRepository.findByTripIdAndUserIdAndRole(tripId, userId, "OWNER")
                .orElseThrow(() -> new UnauthorizedTripAccessException("Only the owner can delete the trip"));

        tripRepository.deleteById(tripId); // Cascade will handle removing trip places and trip members
    }

    private TripDto mapToDto(Trip trip) {
        List<TripDto.PlaceDTO> placeDTOs = trip.getPlaces().stream()
                .map(place -> TripDto.PlaceDTO.builder()
                        .address(place.getAddress())
                        .latitude(place.getLatitude())
                        .longitude(place.getLongitude())
                        .build())
                .collect(Collectors.toList());

        List<Integer> friendIds = trip.getMembers().stream()
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
