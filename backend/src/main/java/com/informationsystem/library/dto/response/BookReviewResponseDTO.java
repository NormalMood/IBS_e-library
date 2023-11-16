package com.informationsystem.library.dto.response;

import lombok.Data;

import java.sql.Date;

@Data
public class BookReviewResponseDTO {
	
    private Long id;

    private Long employeeId;
    
    private String pictureName;
    
    private String lastName;
    
    private String firstName;

    private Integer stars;

    private String comment;

    private Date reviewsDate;

}
