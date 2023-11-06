package com.informationsystem.library.service;

import com.informationsystem.library.dto.request.NewBooksAdminRequestDTO;
import com.informationsystem.library.dto.request.NewBooksUserRequestDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.Books;

import java.util.List;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

public interface NewBooksService {

    StatusResponseDTO saveGenres(List<String> genres);

    StatusResponseDTO addBook(NewBooksUserRequestDTO newBook);

    StatusResponseDTO addBook(NewBooksAdminRequestDTO newBook);
    
    void saveBook(Books book, Set<Short> genresIds);
    
    StatusResponseDTO saveCover(MultipartFile cover);

}
