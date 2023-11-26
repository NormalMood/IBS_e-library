package com.informationsystem.library.controller;

import com.informationsystem.library.dto.request.BookNewReviewRequestDTO;
import com.informationsystem.library.dto.request.BookUpdatedReviewRequestDTO;
import com.informationsystem.library.service.BookReviewsService;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/book")
@AllArgsConstructor
public class BookReviewsController {

    private final BookReviewsService bookReviewsService;

    @GetMapping("/reviews-first-10")
    public ResponseEntity<?> getFirst10Reviews(@RequestParam Long bookId) {
    	return ResponseEntity.ok(bookReviewsService.getFirst10Reviews(bookId));
    }
    
    @GetMapping("/reviews")
    public ResponseEntity<?> getAllReviews(@RequestParam Long bookId) {
    	return ResponseEntity.ok(bookReviewsService.getAllReviews(bookId));
    }
    
    @GetMapping("/review")
    public ResponseEntity<?> getReviewById(@RequestParam Long reviewId) {
    	return ResponseEntity.ok(bookReviewsService.getReviewById(reviewId));
    }
    
    @PostMapping("/review")
    public ResponseEntity<?> addReview(@RequestBody BookNewReviewRequestDTO newBookReview) {
    	return ResponseEntity.ok(bookReviewsService.addReview(newBookReview));
    }
    
    @PutMapping("/review")
    public ResponseEntity<?> updateReview(@RequestBody BookUpdatedReviewRequestDTO updatedBookReview) {
    	return ResponseEntity.ok(bookReviewsService.updateReview(updatedBookReview));
    }
    
    @DeleteMapping("/review")
    public ResponseEntity<?> deleteReview(@RequestParam Long employeeId, @RequestParam Long reviewId) {
    	return ResponseEntity.ok(bookReviewsService.deleteReview(employeeId, reviewId));
    }

}
