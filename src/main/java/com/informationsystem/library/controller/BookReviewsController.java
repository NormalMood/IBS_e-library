package com.informationsystem.library.controller;

import com.informationsystem.library.dto.request.BookNewReviewRequestDTO;
import com.informationsystem.library.dto.response.BookReviewsResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.service.BookReviewsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/reviews")
@AllArgsConstructor
public class BookReviewsController {

    private final BookReviewsService bookReviewsService;

    @GetMapping("/all")
    public ResponseEntity<?> getBookReviews(@RequestParam("bookId") Long bookId,
                                            @RequestParam("page") Integer pageNum,
                                            @RequestParam("results") Integer elementsPerPage) {
        BookReviewsResponseDTO bookReviewsResponseDTO = bookReviewsService
                .getBookReviews(bookId, pageNum, elementsPerPage);
        return ResponseEntity.ok(bookReviewsResponseDTO);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBookReview(@RequestBody BookNewReviewRequestDTO bookNewReview) {
        StatusResponseDTO statusResponseDTO = bookReviewsService.addBookReview(bookNewReview);
        return new ResponseEntity<>(statusResponseDTO, statusResponseDTO.getStatus());
    }

}
