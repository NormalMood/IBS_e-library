package com.informationsystem.library.service;

import com.informationsystem.library.dto.request.NewBooksAdminRequestDTO;
import com.informationsystem.library.dto.request.NewBooksUserRequestDTO;
import com.informationsystem.library.dto.response.ObjectResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.Books;
import com.informationsystem.library.entity.BooksGenres;
import com.informationsystem.library.entity.VGenres;
import com.informationsystem.library.mapper.NewBooksAdminRequestMapper;
import com.informationsystem.library.mapper.NewBooksUserRequestMapper;
import com.informationsystem.library.repository.BooksGenresRepository;
import com.informationsystem.library.repository.BooksRepository;
import com.informationsystem.library.repository.VGenresRepository;
import lombok.AllArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class NewBooksServiceImpl implements NewBooksService {

    private final VGenresRepository vGenresRepository;

    private final BooksRepository booksRepository;

    private final BooksGenresRepository booksGenresRepository;

    private final NewBooksAdminRequestMapper newBooksAdminRequestMapper = Mappers.getMapper(NewBooksAdminRequestMapper.class);

    private final NewBooksUserRequestMapper newBooksUserRequestMapper = Mappers.getMapper(NewBooksUserRequestMapper.class);

    @Override
    public ObjectResponseDTO getAllGenres(Pageable pageable) {
        Page<VGenres> allGenres = vGenresRepository
                .findAll(pageable);

        return new ObjectResponseDTO(allGenres.toList(), allGenres.getTotalPages());
    }

    public List<VGenres> getAll() {
        return (List<VGenres>) vGenresRepository.findAll();
    }

    @Override
    public StatusResponseDTO saveGenres(List<String> genres) {
        for (String genre : genres) {
            vGenresRepository.save(new VGenres(genre));
        }
        return new StatusResponseDTO("Genres were added",
                HttpStatus.OK,
                HttpStatus.OK.value());
    }

    @Override
    public StatusResponseDTO addBooks(NewBooksUserRequestDTO newBookRequest) {
        Books book = newBooksUserRequestMapper.newBooksUserRequestToBooks(newBookRequest);
        Books addedBook = booksRepository.save(book);
        for (Short genreId : newBookRequest.getGenresIds()) {
            booksGenresRepository.save(new BooksGenres(addedBook.getId(), genreId));
        }
        return new StatusResponseDTO("Books were added",
                HttpStatus.OK, HttpStatus.OK.value());
    }

    @Override
    public StatusResponseDTO addBooks(NewBooksAdminRequestDTO newBookRequest) {
        Books book = newBooksAdminRequestMapper
                .newBooksAdminRequestToBooks(newBookRequest);
        Books addedBook = booksRepository.save(book);
        for (Short genreId : newBookRequest.getGenresIds()) {
            booksGenresRepository.save(new BooksGenres(addedBook.getId(), genreId));
        }
        return new StatusResponseDTO("Books were added",
                HttpStatus.OK, HttpStatus.OK.value());
    }
}

