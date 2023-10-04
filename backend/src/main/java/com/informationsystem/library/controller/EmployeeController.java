package com.informationsystem.library.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.informationsystem.library.service.EmployeeService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class EmployeeController {
	
	private final EmployeeService employeeService;
	
	@GetMapping("/data")
	public ResponseEntity<?> getUserData() {
		return ResponseEntity.ok(employeeService.getUserData());
	}

}
