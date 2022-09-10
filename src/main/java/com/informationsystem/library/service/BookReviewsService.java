package com.informationsystem.library.service;

import com.informationsystem.library.dto.request.BookNewReviewRequestDTO;
import com.informationsystem.library.dto.response.BookReviewsResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;

public interface BookReviewsService {

    BookReviewsResponseDTO getBookReviews(Long bookId, Integer pageNum, Integer elementsPerPage);

    StatusResponseDTO addBookReview(BookNewReviewRequestDTO newBookReview);

}
