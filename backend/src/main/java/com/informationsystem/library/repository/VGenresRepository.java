package com.informationsystem.library.repository;

import com.informationsystem.library.entity.VGenres;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VGenresRepository extends JpaRepository<VGenres, Long> {
	
	@Query(value = "SELECT genre FROM v_genres", nativeQuery = true)
	List<String> findAllGenre();
	
}
