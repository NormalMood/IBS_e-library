package com.informationsystem.library.repository;

import com.informationsystem.library.entity.CommonDetailedHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonDetailedHistoryRepository extends PagingAndSortingRepository<CommonDetailedHistory, Long> {

    Page<CommonDetailedHistory> findAllByBookId(Long bookId, Pageable pageable);

}
