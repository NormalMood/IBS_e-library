package com.informationsystem.library.repository;

import com.informationsystem.library.entity.History;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
	
	@Query("SELECT h "
			+ "FROM History h "
			+ "WHERE h.employeeId = :employeeId "
			+ "AND h.bookId = :bookId "
			+ "AND h.actionId = 1 "
			+ "ORDER BY h.id DESC "
			+ "LIMIT 1")
	History findLastCheckoutedBook(Long employeeId, Long bookId);
	
	@Query("SELECT h "
			+ "FROM History h "
			+ "WHERE h.employeeId = :employeeId "
			+ "AND h.bookId = :bookId "
			+ "AND h.actionId = 3 "
			+ "AND h.id > :checkoutHistoryId")
	History findLastExtendedBookRow(Long employeeId, Long bookId, Long checkoutHistoryId);

}
