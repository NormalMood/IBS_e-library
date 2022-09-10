package com.informationsystem.library.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "v_genres")
@Data
@NoArgsConstructor
public class VGenres {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String genre;

    public VGenres(String genre){
        this.genre = genre;
    }

}
