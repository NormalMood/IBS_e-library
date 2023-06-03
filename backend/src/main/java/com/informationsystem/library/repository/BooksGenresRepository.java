package com.informationsystem.library.repository;

import com.informationsystem.library.entity.BooksGenres;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BooksGenresRepository extends JpaRepository<BooksGenres, Long> {
}
