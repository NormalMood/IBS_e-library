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
import lombok.RequiredArgsConstructor;

import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
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
    public StatusResponseDTO addBook(NewBooksUserRequestDTO newBookRequest) {
    	System.out.println("in addbook");
        Books book = newBooksUserRequestMapper.newBooksUserRequestToBooks(newBookRequest);
        System.out.println("mapped to book");
        saveBook(book, newBookRequest.getGenresIds());
        System.out.println("book saved");
        return new StatusResponseDTO("Books were added",
                HttpStatus.OK, HttpStatus.OK.value());
    }

    @Override
    public StatusResponseDTO addBook(NewBooksAdminRequestDTO newBookRequest) {
        Books book = newBooksAdminRequestMapper
                .newBooksAdminRequestToBooks(newBookRequest);
        saveBook(book, newBookRequest.getGenresIds());
        return new StatusResponseDTO("Books were added",
                HttpStatus.OK, HttpStatus.OK.value());
    }

	@Override
	public void saveBook(Books book, List<Short> genresIds) {
		Books addedBook = booksRepository.save(book);
		System.out.println("added book");
        for (Short genreId : genresIds) {
            booksGenresRepository.save(new BooksGenres(addedBook.getId(), genreId));
        }
        System.out.println("add genre");
	}
	
}

