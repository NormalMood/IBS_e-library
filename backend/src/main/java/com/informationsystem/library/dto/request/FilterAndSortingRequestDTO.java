package com.informationsystem.library.dto.request;

import java.util.Set;

import lombok.Data;

@Data
public class FilterAndSortingRequestDTO {
	
	private Set<String> genres;
	
	private Set<String> provider;
	
	private Set<String> status;
	
	private Float averageRatingFrom;
	
	private Float averageRatingTo;
	
	private String sortingField;
	
	private String sortingOrder;

}
