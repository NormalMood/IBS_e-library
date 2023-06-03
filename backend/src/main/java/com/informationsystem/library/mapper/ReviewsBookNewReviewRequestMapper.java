package com.informationsystem.library.mapper;

import com.informationsystem.library.dto.request.BookNewReviewRequestDTO;
import com.informationsystem.library.entity.Reviews;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(imports = {
        java.time.LocalDate.class,
        java.sql.Date.class
})
public interface ReviewsBookNewReviewRequestMapper {

    @Mapping(target = "reviewsDate", expression = "java(Date.valueOf(LocalDate.now()))")
    Reviews bookNewReviewRequestToReviews (BookNewReviewRequestDTO bookNewReviewRequest);

}
