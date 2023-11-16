package com.informationsystem.library.mapper;

import com.informationsystem.library.dto.response.BookReviewResponseDTO;
import com.informationsystem.library.entity.VReviews;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface VReviewsBookReviewResponseMapper {

    List<BookReviewResponseDTO> vReviewsToBookReviewResponseDTOList(List<VReviews> reviews);
    
    BookReviewResponseDTO vReviewToBookReviewResponseDTO(VReviews review);

}
