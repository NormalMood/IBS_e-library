package com.informationsystem.library.dto.request;

import java.util.List;

import com.informationsystem.library.model.BooksAction;

import lombok.Data;

@Data
public class BinBooksActionRequestDTO {
	
	private List<Long> booksIds;
	
	private BooksAction action;

}
