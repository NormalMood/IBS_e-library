package com.informationsystem.library.dto.request;

import com.informationsystem.library.model.BooksAction;

import lombok.Data;

@Data
public class CatalogBookActionRequestDTO {
	
	private Long bookId;
	
	private BooksAction action;

}
