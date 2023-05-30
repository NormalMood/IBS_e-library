package com.informationsystem.library.dto.response;

import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ForbiddenExtendingsResponseDTO {
	
	private String message;
	
	private HttpStatus status;
	
	private Integer code;
	
	private List<String> titles;

}
