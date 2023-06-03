package com.informationsystem.library.mapper;

import com.informationsystem.library.dto.response.BookReviewResponseDTO;
import com.informationsystem.library.entity.Reviews;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface ReviewsBookReviewResponseMapper {

    List<BookReviewResponseDTO> reviewsToBookReviewResponseDTOList(List<Reviews> reviews);

}
