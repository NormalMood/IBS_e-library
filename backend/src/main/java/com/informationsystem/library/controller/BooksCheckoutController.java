package com.informationsystem.library.controller;

import com.informationsystem.library.dto.request.CatalogBookActionRequestDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.service.EmployeeService;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/user/library")
@AllArgsConstructor
public class BooksCheckoutController {

    private final EmployeeService employeeService;

    @GetMapping("/books")
    public ResponseEntity<?> getAllBooksOrBySearchQuery(
    		@RequestParam(required = false) String searchQuery,
    		@RequestParam String genres, 
    		@RequestParam Set<String> providers,
    		@RequestParam Set<String> status,
    		String averageRatingFrom,
    		String averageRatingTo,
    		@RequestParam String sortingField,
    		@RequestParam String sortingOrder,
    		Pageable pageable) {
        return ResponseEntity.ok(
        		employeeService
        			.getAllBooksOrBySearchQuery(
        					searchQuery,
        					genres, 
        					providers, 
        					status, 
        					averageRatingFrom, 
        					averageRatingTo, 
        					sortingField, 
        					sortingOrder, 
        					pageable
        				)
        		);
    }
    
    @GetMapping("/book")
    public ResponseEntity<?> getBookDataById(@RequestParam Long bookId) {
    	return ResponseEntity.ok(employeeService.getBookDataById(bookId));
    }
    
    @GetMapping("/top-10")
    public ResponseEntity<?> getTop10Books(Pageable pageable) {
    	return ResponseEntity.ok(employeeService.getTop10Books(pageable));
    }

    @PostMapping("/book")
    public ResponseEntity<?> checkoutBook(@RequestBody CatalogBookActionRequestDTO bookAction) {
        StatusResponseDTO statusResponseDTO = employeeService.checkoutBook(bookAction);
        return new ResponseEntity<>(statusResponseDTO, statusResponseDTO.getStatus());
    }

}
