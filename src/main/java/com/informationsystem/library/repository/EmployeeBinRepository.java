package com.informationsystem.library.repository;

import com.informationsystem.library.entity.EmployeeBin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeBinRepository extends PagingAndSortingRepository<EmployeeBin, Long> {

    Page<EmployeeBin> findByEmployeeId(Long employeeId, Pageable pageable);

}
