package com.informationsystem.library.service;

import com.informationsystem.library.dto.request.ParameterSearchRequestDTO;
import com.informationsystem.library.dto.request.ParameterSortRequestDTO;
import com.informationsystem.library.dto.response.EmployeeBinResponseDTO;
import com.informationsystem.library.dto.response.ObjectResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.Employee;

import java.util.List;

public interface EmployeeService {

    Employee getCurrentEmployee();

    EmployeeBinResponseDTO getBinData(Integer pageNum, Integer elementsPerPage);

    StatusResponseDTO returnBooks(List<Long> booksIds);

    StatusResponseDTO extendBooks(List<Long> booksIds);

    ObjectResponseDTO getAllBooks(Integer pageNum, Integer elementsPerPage);

    ObjectResponseDTO getByParameter(ParameterSearchRequestDTO paramRequest,
                                     Integer pageNum,
                                     Integer elementsPerPage);

    ObjectResponseDTO sortByParameter(ParameterSortRequestDTO paramRequest,
                                      Integer pageNum,
                                      Integer elementsPerPage);

    boolean isCheckoutPossible(Long bookId);

    StatusResponseDTO checkoutBooks(List<Long> booksIds);

}
