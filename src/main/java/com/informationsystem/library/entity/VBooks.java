package com.informationsystem.library.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "v_books")
@Data
public class VBooks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    private String genres;

    private String averageRating;

    private String provider;

    private String status;

}
