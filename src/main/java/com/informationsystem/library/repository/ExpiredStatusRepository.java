package com.informationsystem.library.repository;

import com.informationsystem.library.entity.BinExpiredStatus;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpiredStatusRepository extends PagingAndSortingRepository<BinExpiredStatus, Long> {
}
