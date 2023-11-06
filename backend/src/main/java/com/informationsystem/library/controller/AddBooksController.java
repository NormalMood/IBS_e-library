package com.informationsystem.library.controller;

import com.informationsystem.library.dto.request.NewBooksAdminRequestDTO;
import com.informationsystem.library.dto.request.NewBooksUserRequestDTO;
import com.informationsystem.library.service.NewBooksService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/user/book")
    public ResponseEntity<?> addBooks(@Valid @RequestBody NewBooksUserRequestDTO newBook){
        return ResponseEntity.ok(newBooksService.addBook(newBook));
    }

    @PostMapping("/admin/book")
    public ResponseEntity<?> addBooks(@Valid @RequestBody NewBooksAdminRequestDTO newBook) {
    	return ResponseEntity.ok(newBooksService.addBook(newBook));
    }
    
    @PostMapping("/cover")
    public ResponseEntity<?> addCover(@RequestBody MultipartFile cover) {
    	return ResponseEntity.ok(newBooksService.saveCover(cover));
    }

}
