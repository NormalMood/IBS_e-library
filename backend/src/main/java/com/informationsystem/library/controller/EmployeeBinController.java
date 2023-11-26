package com.informationsystem.library.controller;

import com.informationsystem.library.dto.request.BinBooksActionRequestDTO;
import com.informationsystem.library.service.EmployeeService;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/bin")
@AllArgsConstructor
public class EmployeeBinController {

    private final EmployeeService employeeService;

    @GetMapping("/books")
    public ResponseEntity<?> getBinData() {
        return ResponseEntity.ok(employeeService.getBinData());
    }
    
    @PostMapping("/books/status")
    public ResponseEntity<?> changeBooksStatus(@RequestBody BinBooksActionRequestDTO booksAction) {
    	return ResponseEntity.ok(employeeService.changeBooksStatus(booksAction));
    }

}
