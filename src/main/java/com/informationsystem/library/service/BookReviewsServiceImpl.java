package com.informationsystem.library.service;

import com.informationsystem.library.dto.request.BookNewReviewRequestDTO;
import com.informationsystem.library.dto.response.BookReviewsResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.Reviews;
import com.informationsystem.library.mapper.ReviewsBookNewReviewRequestMapper;
import com.informationsystem.library.mapper.ReviewsBookReviewResponseMapper;
import com.informationsystem.library.repository.BookReviewsRepository;
import lombok.AllArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BookReviewsServiceImpl implements BookReviewsService {

    private final BookReviewsRepository bookReviewsRepository;

    private final EmployeeService employeeService;

    private final ReviewsBookNewReviewRequestMapper reviewsBookNewReviewRequestMapper =
            Mappers.getMapper(ReviewsBookNewReviewRequestMapper.class);

    private final ReviewsBookReviewResponseMapper reviewsBookReviewResponseMapper =
            Mappers.getMapper(ReviewsBookReviewResponseMapper.class);

    @Override
    public BookReviewsResponseDTO getBookReviews(Long bookId, Pageable pageable){
        Page<Reviews> bookReviews = bookReviewsRepository.findByBookId(bookId, pageable);
        return new BookReviewsResponseDTO(bookId,
                reviewsBookReviewResponseMapper.reviewsToBookReviewResponseDTOList(bookReviews.toList()),
                bookReviews.getTotalPages());
    }

    @Override
    public StatusResponseDTO addBookReview(BookNewReviewRequestDTO newBookReview) {
        Reviews review = reviewsBookNewReviewRequestMapper.bookNewReviewRequestToReviews(newBookReview);
        review.setEmployeeId(employeeService.getCurrentEmployee().getId());
        bookReviewsRepository.save(review);
        return new StatusResponseDTO("Book review was successfully added",
                HttpStatus.OK, HttpStatus.OK.value());
    }

}
