package com.chat.entities;

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

    @Column(name = "trip_id")
    private Integer tripId;

    @Column(name = "user_id")
    private Integer userId;

    private String role; // 'OWNER' or 'MEMBER'
}
