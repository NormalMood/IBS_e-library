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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import static com.informationsystem.library.model.ImageContentTypeMapper.contentTypeToFileExtension;;

@Service
@RequiredArgsConstructor
public class NewBooksServiceImpl implements NewBooksService {

    private final VGenresRepository vGenresRepository;

    private final BooksRepository booksRepository;

    private final BooksGenresRepository booksGenresRepository;

    private final NewBooksAdminRequestMapper newBooksAdminRequestMapper = Mappers.getMapper(NewBooksAdminRequestMapper.class);

    private final NewBooksUserRequestMapper newBooksUserRequestMapper = Mappers.getMapper(NewBooksUserRequestMapper.class);

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
    	if (new File("C:/Library_project/IBS_e-library/backend/src/main/resources/covers/" + newBookRequest.getCoverName()).isFile()) {
    		Books book = newBooksUserRequestMapper.newBooksUserRequestToBooks(newBookRequest);
            saveBook(book, newBookRequest.getGenresIds());
            return new StatusResponseDTO(
        		"Книга была добавлена",
                HttpStatus.OK, 
                HttpStatus.OK.value()
            );
    	}
        return new StatusResponseDTO(
        		"Нет обложки с таким именем",
        	    HttpStatus.BAD_REQUEST, 
        	    HttpStatus.BAD_REQUEST.value()
        	);
    }

    @Override
    public StatusResponseDTO addBook(NewBooksAdminRequestDTO newBookRequest) {
    	if (new File("C:/Library_project/IBS_e-library/backend/src/main/resources/covers/" + newBookRequest.getCoverName()).isFile()) {
    		Books book = newBooksAdminRequestMapper
    		    .newBooksAdminRequestToBooks(newBookRequest);
    		saveBook(book, newBookRequest.getGenresIds());
    		return new StatusResponseDTO(
    			"Книга была добавлена",
    			HttpStatus.OK, 
    			HttpStatus.OK.value()
    		);
    	}
    	return new StatusResponseDTO(
    		"Нет обложки с таким именем",
    	    HttpStatus.BAD_REQUEST, 
    	    HttpStatus.BAD_REQUEST.value()
    	);
    }

	@Override
	public void saveBook(Books book, Set<Short> genresIds) {
		Books addedBook = booksRepository.save(book);
        for (Short genreId : genresIds) {
            booksGenresRepository.save(new BooksGenres(addedBook.getId(), genreId));
        }
	}

	@Override
	public StatusResponseDTO saveCover(MultipartFile cover) {
		if (!cover.isEmpty()) {
			if (contentTypeToFileExtension.containsKey(cover.getContentType())) {
				String coverName = UUID.randomUUID().toString() + contentTypeToFileExtension.get(cover.getContentType());
				File destination = new File(
		   		    	"C:/Library_project/IBS_e-library/backend/src/main/resources/covers/" 
		   		    	+ coverName
		   		    );
				try {
					cover.transferTo(destination);
				} catch (IllegalStateException | IOException e) {
					return new StatusResponseDTO(
						"Не удалось сохранить обложку", 
						HttpStatus.INTERNAL_SERVER_ERROR, 
						HttpStatus.INTERNAL_SERVER_ERROR.value()
					);
				}
				return new StatusResponseDTO(
					coverName, 
					HttpStatus.OK,
	                HttpStatus.OK.value()
		        );
			}
			return new StatusResponseDTO(
				"Выберите обложку в формате png или jpg", 
				HttpStatus.UNSUPPORTED_MEDIA_TYPE, 
				HttpStatus.UNSUPPORTED_MEDIA_TYPE.value()
			);
   		}
		return new StatusResponseDTO(
			"Выберите обложку", 
			HttpStatus.BAD_REQUEST, 
			HttpStatus.BAD_REQUEST.value()
		);
	}
	
}

