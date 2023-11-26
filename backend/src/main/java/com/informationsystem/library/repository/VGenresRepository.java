package com.informationsystem.library.repository;

import com.informationsystem.library.entity.VGenres;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VGenresRepository extends JpaRepository<VGenres, Long> {
	
}
