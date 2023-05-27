package com.informationsystem.library.repository;

import com.informationsystem.library.entity.Reviews;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookReviewsRepository extends CrudRepository<Reviews, Long> {

    Page<Reviews> findByBookId(Long bookId, Pageable pageable);

}
