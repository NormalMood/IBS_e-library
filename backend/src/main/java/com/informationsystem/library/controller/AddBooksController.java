package com.informationsystem.library.controller;

import com.informationsystem.library.dto.request.NewBooksAdminRequestDTO;
import com.informationsystem.library.dto.request.NewBooksUserRequestDTO;
import com.informationsystem.library.service.NewBooksService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/library")
public class AddBooksController {

    private final NewBooksService newBooksService;

    @PostMapping("/genres/add")
    public ResponseEntity<?> saveGenres(@RequestBody List<String> genres){
        return ResponseEntity.ok(newBooksService.saveGenres(genres));
    }

    @PostMapping("/user/add")
    public ResponseEntity<?> addBooks(@RequestBody NewBooksUserRequestDTO newBook){
        return ResponseEntity.ok(newBooksService.addBook(newBook));
    }

    @PostMapping("/admin/add")
    public ResponseEntity<?> addBooks(@RequestBody NewBooksAdminRequestDTO newBook){
        return ResponseEntity.ok(newBooksService.addBook(newBook));
    }

}
