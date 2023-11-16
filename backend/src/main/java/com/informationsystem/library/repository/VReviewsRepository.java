package com.informationsystem.library.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.informationsystem.library.entity.VReviews;

@Repository
public interface VReviewsRepository extends CrudRepository<VReviews, Long> {
	
	List<VReviews> findTop10ByBookId(Long bookId);
	
	Long countByBookId(Long bookId);
	
	List<VReviews> findAllByBookId(Long bookId);

}
