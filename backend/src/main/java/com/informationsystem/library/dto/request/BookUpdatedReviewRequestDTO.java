package com.informationsystem.library.dto.request;

import lombok.Data;

@Data
public class BookUpdatedReviewRequestDTO {
	
	private Long id;
	
	private Long employeeId;

    private Long bookId;

    private Short stars;

    private String comment;

}
