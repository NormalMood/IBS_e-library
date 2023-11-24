package com.informationsystem.library.repository;

import com.informationsystem.library.entity.CommonDetailedHistory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonDetailedHistoryRepository extends JpaRepository<CommonDetailedHistory, Long> {

    List<CommonDetailedHistory> findAllByBookId(Long bookId);

}
