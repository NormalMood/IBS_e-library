package com.informationsystem.library.repository;

import com.informationsystem.library.entity.Reviews;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewsRepository extends CrudRepository<Reviews, Long> {

}
