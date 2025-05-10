package com.chat.entities;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "trip_place")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripPlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "trip_id")
    private Integer tripId;

    private String address;
    private Double latitude;
    private Double longitude;

    @Column(name = "place_order")
    private Integer placeOrder;
}
