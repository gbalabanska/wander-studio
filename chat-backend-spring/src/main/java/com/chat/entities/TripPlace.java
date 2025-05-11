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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    private String address;
    private Double latitude;
    private Double longitude;

    @Column(name = "place_order")
    private Integer placeOrder;
}

