package com.informationsystem.library.service;

import org.springframework.data.domain.Pageable;

import com.informationsystem.library.dto.request.BookNewReviewRequestDTO;
import com.informationsystem.library.dto.response.BookReviewsResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;

public interface BookReviewsService {

    BookReviewsResponseDTO getBookReviews(Long bookId, Pageable pageable);

    StatusResponseDTO addBookReview(BookNewReviewRequestDTO newBookReview);

}
