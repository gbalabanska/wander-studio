package com.wanderstudio.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripDto {
    private Integer id;
    private String name;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private String tripEmoji;
    private String description;
    private List<Integer> friendIds;
    private List<PlaceDTO> places;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PlaceDTO {
        private String address;
        private Double latitude;
        private Double longitude;
    }
}
