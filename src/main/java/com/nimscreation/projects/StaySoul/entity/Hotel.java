package com.nimscreation.projects.StaySoul.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Formula;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@Setter
@Table(name = "hotel", indexes = {
        @Index(name = "idx_hotel_city", columnList = "city"),
        @Index(name = "idx_hotel_active", columnList = "active"),
        @Index(name = "idx_hotel_deleted", columnList = "deleted"),
        @Index(name = "idx_hotel_city_category", columnList = "city, category")
})
@SQLDelete(sql = "UPDATE hotel SET deleted = true WHERE id=?")
@SQLRestriction("deleted = false")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String city;

    /**
     * Property category used for frontend filter chips
     * (e.g. "beach", "mountain", "city", "countryside", "luxury").
     * Maps directly to the category param in HotelSearchRequestDto.
     */
    @Column(length = 64)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Double lat;
    private Double lng;

    @Formula("(SELECT COALESCE(AVG(r.rating), 0) FROM review r WHERE r.hotel_id = id)")
    private Double averageRating;

    @Formula("(SELECT COUNT(*) FROM review r WHERE r.hotel_id = id)")
    private Long reviewCount;

    @Formula("(SELECT COUNT(*) FROM room r WHERE r.hotel_id = id AND r.deleted = false)")
    private Long totalRooms;

    @Column(columnDefinition = "TEXT[]")
    private String[] photos;

    @Column(columnDefinition = "TEXT[]")
    private String[] amenities;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Embedded
    private HotelContactInfo contactInfo;

    @Column(nullable = false)
    private Boolean active;

    @ManyToOne(optional = false)
    private User owner;

    @OneToMany(mappedBy = "hotel")
    @JsonIgnore
    private List<Room> rooms;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean deleted = false;

}
