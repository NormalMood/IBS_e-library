package com.informationsystem.library.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.informationsystem.library.dto.request.BookUpdatedReviewRequestDTO;
import com.informationsystem.library.entity.Reviews;

@Mapper(imports = {
        java.time.LocalDate.class,
        java.sql.Date.class
})
public interface ReviewsBookUpdatedReviewRequestMapper {
	
	@Mapping(target = "reviewsDate", expression = "java(Date.valueOf(LocalDate.now()))")
    Reviews bookUpdatedReviewRequestToReviews (BookUpdatedReviewRequestDTO bookUpdatedReviewRequest);

}
