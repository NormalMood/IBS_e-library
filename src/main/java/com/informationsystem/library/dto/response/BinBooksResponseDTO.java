package com.informationsystem.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

@Data
@AllArgsConstructor
public class BinBooksResponseDTO {

    private Long bookId;

    private String title;

    private String author;

    private String genres;

    private String actionsName;

    private Date actionsDate;

    private Date returnDate;

}
