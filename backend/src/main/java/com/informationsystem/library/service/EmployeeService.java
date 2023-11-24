package com.informationsystem.library.service;

import com.informationsystem.library.dto.request.BinBooksActionRequestDTO;
import com.informationsystem.library.dto.request.CatalogBookActionRequestDTO;
import com.informationsystem.library.dto.response.BinBooksResponseDTO;
import com.informationsystem.library.dto.response.EmployeeResponseDTO;
import com.informationsystem.library.dto.response.ObjectResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.Employee;
import com.informationsystem.library.entity.VBooks;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Pageable;

public interface EmployeeService {

    Employee getCurrentEmployee();
    
    EmployeeResponseDTO getUserData();

    List<BinBooksResponseDTO> getBinData();
    
    StatusResponseDTO changeBooksStatus(BinBooksActionRequestDTO booksAction);

    StatusResponseDTO returnBooks(List<Long> booksIds);

    StatusResponseDTO extendBooks(List<Long> booksIds);

    void saveActionOnBook(Long employeeId, List<Long> booksIds, Short actionId);
    
    Object getAllBooksOrBySearchQuery(
    		String searchQuery,
    		String genres, 
    		Set<String> providers,
    		Set<String> status,
    		String averageRatingFrom,
    		String averageRatingTo,
    		String sortingField,
    		String sortingOrder,
    		Pageable pageable);
    
    Object getAllBooks(
    		String genres, 
    		Set<String> providers,
    		Set<String> status,
    		String averageRatingFrom,
    		String averageRatingTo,
    		String sortingField,
    		String sortingOrder,
    		Pageable pageable);
    
    ObjectResponseDTO getTop10Books(Pageable pageable);
    
    Object getBooksBySearchQuery(
			String searchQuery, 
			String genres, 
			Set<String> providers, 
			Set<String> status,
			String averageRatingFrom, 
			String averageRatingTo, 
			String sortingField, 
			String sortingOrder,
			Pageable pageable);
    
    Float getAverageRatingParsed(String averageRating);

    boolean isCheckoutPossible(Long bookId);

    StatusResponseDTO checkoutBook(CatalogBookActionRequestDTO bookAction);

    VBooks getBookDataById(Long bookId);

}
