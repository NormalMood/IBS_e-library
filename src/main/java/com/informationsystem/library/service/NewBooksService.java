package com.informationsystem.library.service;

import com.informationsystem.library.dto.request.NewBooksAdminRequestDTO;
import com.informationsystem.library.dto.request.NewBooksUserRequestDTO;
import com.informationsystem.library.dto.response.ObjectResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;

import java.util.List;

public interface NewBooksService {

    ObjectResponseDTO getAllGenres(Integer pageNum, Integer elementsPerPage);

    StatusResponseDTO saveGenres(List<String> genres);

    StatusResponseDTO addBooks(NewBooksUserRequestDTO newBook);

    StatusResponseDTO addBooks(NewBooksAdminRequestDTO newBook);

}
