package com.informationsystem.library.controller;

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

    @GetMapping("/all")
    public ResponseEntity<?> getAllBooks(
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
        			.getAllBooks(
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

    @GetMapping("/search")
    public ResponseEntity<?> getBooksBySearchQuery(
    		@RequestParam String searchQuery,
    		@RequestParam String genres, 
    		@RequestParam Set<String> providers,
    		@RequestParam Set<String> status,
    		String averageRatingFrom,
    		String averageRatingTo,
    		@RequestParam String sortingField,
    		@RequestParam String sortingOrder,
    		Pageable pageable
    		) {
        return ResponseEntity.ok(
        		employeeService
        			.getBooksBySearchQuery(
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

    @PostMapping("/checkout")
    public ResponseEntity<?> checkoutBook(@RequestParam Long bookId) {
        StatusResponseDTO statusResponseDTO = employeeService.checkoutBook(bookId);
        return new ResponseEntity<>(statusResponseDTO, statusResponseDTO.getStatus());
    }

}
