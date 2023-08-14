package com.informationsystem.library.repository;

import com.informationsystem.library.entity.VBooks;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
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
    
    @Query("SELECT book "
    		+ "FROM VBooks book "
    		+ "WHERE book.averageRating > 0 "
    		+ "ORDER BY book.averageRating DESC "
    		+ "LIMIT 10")
    Page<VBooks> findTop10Books(Pageable pageable);

    @Query(value = "SELECT * "
    		+ "FROM v_books "
    		+ "WHERE ((coalesce(:genres) IS NULL OR "
    				+ "(SELECT COUNT(*) FROM (SELECT UNNEST(STRING_TO_ARRAY(:genres, ','))) AS genres_arr(genre) "
    				+ "WHERE genre = ANY(STRING_TO_ARRAY(v_books.genres, ', '))) >= 1) "
    		+ "AND (coalesce(:provider) IS NULL OR v_books.provider IN (:provider)) "
    		+ "AND (coalesce(:status) IS NULL OR v_books.status IN (:status)) "
    		+ "AND (cast(:averageRatingFrom as float) IS NULL OR v_books.average_rating >= :averageRatingFrom) "
    		+ "AND (cast(:averageRatingTo as float) IS NULL OR v_books.average_rating <= :averageRatingTo))",
    		nativeQuery = true)
    Page<VBooks> findAllFilteredAndSorted(
    		String genres, 
    		Set<String> provider, 
    		Set<String> status, 
    		Float averageRatingFrom,
    		Float averageRatingTo,
    		Pageable pageable
    		);
}
