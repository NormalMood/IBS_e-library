package com.informationsystem.library.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "v_genres")
@Data
@NoArgsConstructor
public class VGenres {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;

    private String genre;

    public VGenres(String genre){
        this.genre = genre;
    }

}
