package com.informationsystem.library.controller;

import com.informationsystem.library.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/bin")
@AllArgsConstructor
public class EmployeeBinController {

    private final EmployeeService employeeService;

    @GetMapping("/data")
    public ResponseEntity<?> getBinData(@RequestParam("page") Integer pageNum,
                                        @RequestParam("results") Integer elementsPerPage) {
        return ResponseEntity.ok(employeeService.getBinData(pageNum, elementsPerPage));
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
