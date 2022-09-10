package com.informationsystem.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class BookReviewsResponseDTO {

    private Long bookId;

    private List<BookReviewResponseDTO> bookReviews;

    private Integer pages;

}
