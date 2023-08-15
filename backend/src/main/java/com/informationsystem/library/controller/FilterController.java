package com.informationsystem.library.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.informationsystem.library.service.FilterService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/filters")
@RequiredArgsConstructor
public class FilterController {
	
	private final FilterService filterService;
	
	@GetMapping("/genres")
    public ResponseEntity<?> getAllGenres() {
        return ResponseEntity.ok(filterService.getAllGenres());
    }
	
	@GetMapping("/providers")
	public ResponseEntity<?> getAllProviders() {
		return ResponseEntity.ok(filterService.getAllProviders());
	}
	
	@GetMapping("/statuses")
	public ResponseEntity<?> getAllStatuses() {
		return ResponseEntity.ok(filterService.getAllStatuses());
	}

}
