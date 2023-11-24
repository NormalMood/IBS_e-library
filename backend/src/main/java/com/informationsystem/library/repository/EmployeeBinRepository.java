package com.informationsystem.library.repository;

import com.informationsystem.library.entity.EmployeeBin;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeBinRepository extends JpaRepository<EmployeeBin, Long> {

    List<EmployeeBin> findByEmployeeId(Long employeeId);

}
