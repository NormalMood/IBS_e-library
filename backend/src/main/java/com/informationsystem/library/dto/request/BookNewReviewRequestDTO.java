package com.informationsystem.library.dto.request;

import lombok.Data;


@Data
public class BookNewReviewRequestDTO {

    private Long bookId;

    private Integer stars;

    private String advantages;

    private String disadvantages;

    private String comment;

}
