package com.informationsystem.library.controller;

import com.informationsystem.library.dto.request.ParameterSearchRequestDTO;
import com.informationsystem.library.dto.request.ParameterSortRequestDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/library")
@AllArgsConstructor
public class BooksCheckoutController {

    private final EmployeeService employeeService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllBooks(@RequestParam("page") Integer pageNum,
                                         @RequestParam("results") Integer elementsPerPage){
        return ResponseEntity.ok(employeeService.getAllBooks(pageNum, elementsPerPage));
    }

    @GetMapping("/search")
    public ResponseEntity<?> getByParameter(@RequestBody ParameterSearchRequestDTO paramRequest,
                                            @RequestParam("page") Integer pageNum,
                                            @RequestParam("results") Integer elementsPerPage){
        return ResponseEntity.ok(employeeService.getByParameter(paramRequest, pageNum, elementsPerPage));
    }

    @GetMapping("/sort")
    public ResponseEntity<?> sortByParameter(@RequestBody ParameterSortRequestDTO paramRequest,
                                             @RequestParam("page") Integer pageNum,
                                             @RequestParam("results") Integer elementsPerPage){
        return ResponseEntity.ok(employeeService.sortByParameter(paramRequest, pageNum, elementsPerPage));
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkoutBooks(@RequestBody List<Long> booksIds){
        StatusResponseDTO statusResponseDTO = employeeService.checkoutBooks(booksIds);
        return new ResponseEntity<>(statusResponseDTO, statusResponseDTO.getStatus());
    }

}
