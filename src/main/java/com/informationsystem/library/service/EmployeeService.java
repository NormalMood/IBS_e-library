package com.informationsystem.library.service;

import com.informationsystem.library.dto.request.ParameterSearchRequestDTO;
import com.informationsystem.library.dto.request.ParameterSortRequestDTO;
import com.informationsystem.library.dto.response.EmployeeBinResponseDTO;
import com.informationsystem.library.dto.response.ObjectResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.Employee;

import java.util.List;

import org.springframework.data.domain.Pageable;

public interface EmployeeService {

    Employee getCurrentEmployee();

    EmployeeBinResponseDTO getBinData(Pageable pageable);

    StatusResponseDTO returnBooks(List<Long> booksIds);

    StatusResponseDTO extendBooks(List<Long> booksIds);

    ObjectResponseDTO getAllBooks(Pageable pageable);

    ObjectResponseDTO getByParameter(ParameterSearchRequestDTO paramRequest,
                                     Pageable pageable);

    ObjectResponseDTO sortByParameter(ParameterSortRequestDTO paramRequest,
                                      Pageable pageable);

    boolean isCheckoutPossible(Long bookId);

    StatusResponseDTO checkoutBooks(List<Long> booksIds);

}
