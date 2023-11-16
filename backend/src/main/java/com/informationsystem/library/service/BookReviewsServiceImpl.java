package com.informationsystem.library.service;

import com.informationsystem.library.dto.request.BookNewReviewRequestDTO;
import com.informationsystem.library.dto.request.BookUpdatedReviewRequestDTO;
import com.informationsystem.library.dto.response.BookReviewResponseDTO;
import com.informationsystem.library.dto.response.BookReviewsResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.Reviews;
import com.informationsystem.library.entity.VReviews;
import com.informationsystem.library.mapper.ReviewsBookNewReviewRequestMapper;
import com.informationsystem.library.mapper.ReviewsBookUpdatedReviewRequestMapper;
import com.informationsystem.library.mapper.VReviewsBookReviewResponseMapper;
import com.informationsystem.library.repository.ReviewsRepository;
import com.informationsystem.library.repository.VReviewsRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookReviewsServiceImpl implements BookReviewsService {

    private final ReviewsRepository reviewsRepository;

    private final VReviewsRepository vReviewsRepository;
    
    private final EmployeeService employeeService;

    private final ReviewsBookNewReviewRequestMapper reviewsBookNewReviewRequestMapper =
            Mappers.getMapper(ReviewsBookNewReviewRequestMapper.class);
    
    private final ReviewsBookUpdatedReviewRequestMapper reviewsBookUpdatedReviewRequestMapper =
            Mappers.getMapper(ReviewsBookUpdatedReviewRequestMapper.class);

    private final VReviewsBookReviewResponseMapper vReviewsBookReviewResponseMapper =
            Mappers.getMapper(VReviewsBookReviewResponseMapper.class);

    @Override
	public BookReviewsResponseDTO getFirst10Reviews(Long bookId) {
		List<VReviews> top10Reviews = vReviewsRepository.findTop10ByBookId(bookId);
		Long reviewsCount = vReviewsRepository.countByBookId(bookId);
		return new BookReviewsResponseDTO(
			bookId, 
			vReviewsBookReviewResponseMapper
				.vReviewsToBookReviewResponseDTOList(top10Reviews), 
			reviewsCount
		);
	}

	@Override
	public List<BookReviewResponseDTO> getAllReviews(Long bookId) {
		return vReviewsBookReviewResponseMapper
			.vReviewsToBookReviewResponseDTOList(
				vReviewsRepository.findAllByBookId(bookId)
		);
	}
	
	@Override
	public BookReviewResponseDTO getReviewById(Long reviewId) {
		return vReviewsBookReviewResponseMapper
			.vReviewToBookReviewResponseDTO(
				vReviewsRepository.findById(reviewId).get()
		);
	}

	@Override
	public StatusResponseDTO addReview(BookNewReviewRequestDTO newBookReview) {
		Reviews review = reviewsBookNewReviewRequestMapper.bookNewReviewRequestToReviews(newBookReview);
        reviewsRepository.save(review);
        return new StatusResponseDTO("Рецензия опубликована",
                HttpStatus.OK, HttpStatus.OK.value());
	}

	@Override
	public StatusResponseDTO updateReview(BookUpdatedReviewRequestDTO updatedBookReview) {
		Reviews review = reviewsBookUpdatedReviewRequestMapper.bookUpdatedReviewRequestToReviews(updatedBookReview);
        reviewsRepository.save(review);
        return new StatusResponseDTO("Рецензия обновлена",
                HttpStatus.OK, HttpStatus.OK.value());
	}

	@Override
	public StatusResponseDTO deleteReview(Long employeeId, Long reviewId) {
		if (employeeId == employeeService.getCurrentEmployee().getId()) {
			reviewsRepository.deleteById(reviewId);
			return new StatusResponseDTO("Рецензия удалена",
	                HttpStatus.OK, HttpStatus.OK.value());
		}
		return new StatusResponseDTO("Не разрешено удалять рецензию",
                HttpStatus.FORBIDDEN, HttpStatus.FORBIDDEN.value());
	}

}
