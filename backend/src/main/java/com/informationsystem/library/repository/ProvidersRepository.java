package com.informationsystem.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.informationsystem.library.entity.Providers;

@Repository
public interface ProvidersRepository extends CrudRepository<Providers, Long> {
	
	@Query(value = "SELECT name FROM providers", nativeQuery = true)
	List<String> findAllName();

}