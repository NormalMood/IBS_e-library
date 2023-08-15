package com.informationsystem.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.informationsystem.library.entity.Statuses;

@Repository
public interface StatusesRepository extends CrudRepository<Statuses, Long> {
	
	@Query(value = "SELECT name FROM statuses", nativeQuery = true)
	List<String> findAllName();

}
