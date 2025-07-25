package com.wanderstudio.entities;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "trip_member", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"trip_id", "user_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(name = "user_id")
    private Integer userId;

    private String role; // 'OWNER' or 'MEMBER'
}
