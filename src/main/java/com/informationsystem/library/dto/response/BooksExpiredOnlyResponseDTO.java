package com.informationsystem.library.dto.response;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class BooksExpiredOnlyResponseDTO {
	
	private Long id;

    private Long employeeId;
    
    private String employeeFullName;

    private Long bookId;

    private String title;

    private String author;

    private String actionsName;

    private Date actionsDate;

    private Date returnDate;

}
