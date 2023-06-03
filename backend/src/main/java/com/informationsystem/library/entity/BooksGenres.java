package com.informationsystem.library.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "books_genres")
@Data
@NoArgsConstructor
public class BooksGenres {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "books_genres_num")
    private Long id;

    @Column(name = "books_num")
    private Long bookId;

    @Column(name = "genres_num")
    private Short genreId;

    public BooksGenres(Long bookId, Short genreId){
        this.bookId = bookId;
        this.genreId = genreId;
    }

}
