package com.chat.controllers;

import com.chat.dto.ApiResponse;
import com.chat.dto.TripDto;
import com.chat.services.TripService;
import com.chat.util.CookieExtractor;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @Autowired
    private CookieExtractor cookieExtractor;

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createTrip(@RequestBody TripDto createTripRequest,
                                                        HttpServletRequest request) {
        int userId = cookieExtractor.extractUserId(request);
        tripService.createTrip(createTripRequest, userId);
        return ResponseEntity.ok(new ApiResponse<>(null, "Trip created successfully"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TripDto>>> getTripsForUser(HttpServletRequest request) {
        int userId = cookieExtractor.extractUserId(request);
        List<TripDto> trips = tripService.getTripsForUser(userId);
        return ResponseEntity.ok(new ApiResponse<>(trips, "Trips retrieved successfully"));
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<ApiResponse<TripDto>> getTripById(@PathVariable int tripId,
                                                            HttpServletRequest request) {
        int userId = cookieExtractor.extractUserId(request);
        TripDto trip = tripService.getTripByIdForUser(tripId, userId);
        if (trip == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(null, "Trip not found", false));
        }
        return ResponseEntity.ok(new ApiResponse<>(trip, "Trip retrieved successfully"));
    }

    @PutMapping("/{tripId}")
    public ResponseEntity<ApiResponse<Void>> updateTrip(@PathVariable int tripId,
                                                        @RequestBody TripDto updatedTrip,
                                                        HttpServletRequest request) {
        int userId = cookieExtractor.extractUserId(request);
        tripService.updateTrip(tripId, updatedTrip, userId);
        return ResponseEntity.ok(new ApiResponse<>(null, "Trip updated successfully"));
    }

    @DeleteMapping("/{tripId}")
    public ResponseEntity<ApiResponse<Void>> deleteTrip(@PathVariable int tripId,
                                                        HttpServletRequest request) {
        int userId = cookieExtractor.extractUserId(request);
        tripService.deleteTrip(tripId, userId);
        return ResponseEntity.ok(new ApiResponse<>(null, "Trip deleted successfully"));
    }
}
