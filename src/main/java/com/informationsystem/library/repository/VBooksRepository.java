package com.informationsystem.library.repository;

import com.informationsystem.library.entity.VBooks;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VBooksRepository extends PagingAndSortingRepository<VBooks, Long> {

    Page<VBooks> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    Page<VBooks> findByAuthorContainingIgnoreCase(String author, Pageable pageable);

    Page<VBooks> findByGenresContainingIgnoreCase(String genres, Pageable pageable);

    Page<VBooks> findByProviderContainingIgnoreCase(String provider, Pageable pageable);

    Page<VBooks> findByStatusContainingIgnoreCase(String status, Pageable pageable);

}
