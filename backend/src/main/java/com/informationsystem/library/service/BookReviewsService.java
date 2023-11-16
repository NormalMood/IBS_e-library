package com.informationsystem.library.service;


import java.util.List;

import com.informationsystem.library.dto.request.BookNewReviewRequestDTO;
import com.informationsystem.library.dto.request.BookUpdatedReviewRequestDTO;
import com.informationsystem.library.dto.response.BookReviewResponseDTO;
import com.informationsystem.library.dto.response.BookReviewsResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;

public interface BookReviewsService {

    BookReviewsResponseDTO getFirst10Reviews(Long bookId);
    
    List<BookReviewResponseDTO> getAllReviews(Long bookId);
    
    BookReviewResponseDTO getReviewById(Long reviewId);

    StatusResponseDTO addReview(BookNewReviewRequestDTO newBookReview);
    
    StatusResponseDTO updateReview(BookUpdatedReviewRequestDTO updatedBookReview);
    
    StatusResponseDTO deleteReview(Long employeeId, Long reviewId);

}
