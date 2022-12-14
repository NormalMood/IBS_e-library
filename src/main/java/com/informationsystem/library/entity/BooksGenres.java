package com.informationsystem.library.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    private Long genreId;

    public BooksGenres(Long bookId, Long genreId){
        this.bookId = bookId;
        this.genreId = genreId;
    }

}
