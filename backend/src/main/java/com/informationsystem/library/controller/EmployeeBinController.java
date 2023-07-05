package com.informationsystem.library.controller;

import com.informationsystem.library.service.EmployeeService;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/bin")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000"})
public class EmployeeBinController {

    private final EmployeeService employeeService;

    @GetMapping("/data")
    public ResponseEntity<?> getBinData(Pageable pageable) {
        return ResponseEntity.ok(employeeService.getBinData(pageable));
    }

    @PostMapping("/return")
    public ResponseEntity<?> returnBooks(@RequestBody List<Long> booksIds){
        return ResponseEntity.ok(employeeService.returnBooks(booksIds));
    }

    @PostMapping("/extend")
    public ResponseEntity<?> extendBooks(@RequestBody List<Long> booksIds){
        return ResponseEntity.ok(employeeService.extendBooks(booksIds));
    }

}
