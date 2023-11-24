package com.informationsystem.library.repository;

import com.informationsystem.library.entity.BinExpiredStatus;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpiredStatusRepository extends JpaRepository<BinExpiredStatus, Long> {

	List<BinExpiredStatus> findByReturnDateExpiredTrue();
	
}
