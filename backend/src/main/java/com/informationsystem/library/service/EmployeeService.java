package com.informationsystem.library.service;

import com.informationsystem.library.dto.response.EmployeeBinResponseDTO;
import com.informationsystem.library.dto.response.EmployeeResponseDTO;
import com.informationsystem.library.dto.response.ObjectResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.Employee;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Pageable;

public interface EmployeeService {

    Employee getCurrentEmployee();
    
    EmployeeResponseDTO getUserData();

    EmployeeBinResponseDTO getBinData(Pageable pageable);

    StatusResponseDTO returnBooks(List<Long> booksIds);

    Object extendBooks(List<Long> booksIds);

    void saveActionOnBook(Long employeeId, List<Long> booksIds, Short actionId);
    
    ObjectResponseDTO getAllBooks(
    		String genres, 
    		Set<String> providers,
    		Set<String> status,
    		Float averageRatingFrom,
    		Float averageRatingTo,
    		String sortingField,
    		String sortingOrder,
    		Pageable pageable);
    
    ObjectResponseDTO getTop10Books(Pageable pageable);
    
    ObjectResponseDTO getBooksBySearchQuery(
			String searchQuery, 
			String genres, 
			Set<String> providers, 
			Set<String> status,
			Float averageRatingFrom, 
			Float averageRatingTo, 
			String sortingField, 
			String sortingOrder,
			Pageable pageable);

    boolean isCheckoutPossible(Long bookId);

    StatusResponseDTO checkoutBook(Long bookId);

}
