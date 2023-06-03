package com.informationsystem.library.dto.response;

import lombok.Data;

import java.sql.Date;

@Data
public class BookReviewResponseDTO {

    private Long employeeId;

    private Integer stars;

    private String advantages;

    private String disadvantages;

    private String comment;

    private Date reviewsDate;

}
