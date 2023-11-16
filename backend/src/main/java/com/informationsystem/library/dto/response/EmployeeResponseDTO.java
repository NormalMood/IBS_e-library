package com.informationsystem.library.dto.response;

import com.informationsystem.library.model.Position;
import com.informationsystem.library.model.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class EmployeeResponseDTO {
	
	private Long id;
	
	private String fullName;
	
	private Role role;
	
	private Position position;
	
	private String pictureName;

}
