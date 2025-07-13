package com.informationsystem.library.service;

import com.informationsystem.library.dto.request.NewBooksAdminRequestDTO;
import com.informationsystem.library.dto.request.NewBooksUserRequestDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.Books;
import com.informationsystem.library.entity.BooksGenres;
import com.informationsystem.library.mapper.NewBooksAdminRequestMapper;
import com.informationsystem.library.mapper.NewBooksUserRequestMapper;
import com.informationsystem.library.repository.BooksGenresRepository;
import com.informationsystem.library.repository.BooksRepository;
import lombok.RequiredArgsConstructor;

import org.apache.commons.lang3.StringUtils;
import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Set;
import java.util.UUID;

import static com.informationsystem.library.model.ImageContentTypeMapper.contentTypeToFileExtension;

@Service
@RequiredArgsConstructor
public class NewBooksServiceImpl implements NewBooksService {

    private final BooksRepository booksRepository;

    private final BooksGenresRepository booksGenresRepository;

    private final NewBooksAdminRequestMapper newBooksAdminRequestMapper = Mappers.getMapper(NewBooksAdminRequestMapper.class);

    private final NewBooksUserRequestMapper newBooksUserRequestMapper = Mappers.getMapper(NewBooksUserRequestMapper.class);
    
    private final String COVERS_FOLDER_RELATIVE_PATH = "src/main/resources/blob/covers";
    
    @Override
    public StatusResponseDTO checkNewBooksUserRequestDTO(NewBooksUserRequestDTO newBookRequest) {
    	if (StringUtils.isBlank(newBookRequest.getTitle()))
    		return new StatusResponseDTO(
            		"Введите название",
            	    HttpStatus.BAD_REQUEST, 
            	    HttpStatus.BAD_REQUEST.value()
            	);
    	if (StringUtils.isBlank(newBookRequest.getLastName()))
    		return new StatusResponseDTO(
            		"Введите фамилию",
            	    HttpStatus.BAD_REQUEST, 
            	    HttpStatus.BAD_REQUEST.value()
            	);
    	if (StringUtils.isBlank(newBookRequest.getFirstName()))
    		return new StatusResponseDTO(
            		"Введите имя",
            	    HttpStatus.BAD_REQUEST, 
            	    HttpStatus.BAD_REQUEST.value()
            	);
    	if (StringUtils.isBlank(newBookRequest.getDescription()))
    		return new StatusResponseDTO(
            		"Введите описание книги",
            	    HttpStatus.BAD_REQUEST, 
            	    HttpStatus.BAD_REQUEST.value()
            	);
    	if (newBookRequest.getGenresIds() == null || newBookRequest.getGenresIds().size() == 0)
    		return new StatusResponseDTO(
            		"Выберите жанр(ы)",
            	    HttpStatus.BAD_REQUEST, 
            	    HttpStatus.BAD_REQUEST.value()
            	);
    	return null;
    }
    
    @Override
    public StatusResponseDTO checkNewBooksAdminRequestDTO(NewBooksAdminRequestDTO newBookRequest) {
    	StatusResponseDTO checkResult = checkNewBooksUserRequestDTO(new NewBooksUserRequestDTO(
    			newBookRequest.getTitle(),
    			newBookRequest.getLastName(),
    			newBookRequest.getFirstName(),
    			newBookRequest.getFatherName(),
    			newBookRequest.getDescription(),
    			newBookRequest.getGenresIds(),
    			newBookRequest.getCoverName()
    		));
    	if (checkResult != null)
    		return checkResult;
    	if (newBookRequest.getProvider() == null)
    		return new StatusResponseDTO(
            		"Выберите поставщика",
            	    HttpStatus.BAD_REQUEST, 
            	    HttpStatus.BAD_REQUEST.value()
            	);
    	return null;
    }
    	
    @Override
    public StatusResponseDTO addBook(NewBooksUserRequestDTO newBookRequest) {
    	StatusResponseDTO checkResult = checkNewBooksUserRequestDTO(newBookRequest);
    	if (checkResult != null)
    		return checkResult;
    	if (new File(Paths.get(COVERS_FOLDER_RELATIVE_PATH + "/" + newBookRequest.getCoverName()).toAbsolutePath().toString()).isFile()) {
    		Books book = newBooksUserRequestMapper.newBooksUserRequestToBooks(newBookRequest);
            saveBook(book, newBookRequest.getGenresIds());
            return new StatusResponseDTO(
        		"Книга добавлена",
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
    	StatusResponseDTO checkResult = checkNewBooksAdminRequestDTO(newBookRequest);
    	if (checkResult != null)
    		return checkResult;
    	if (new File(Paths.get(COVERS_FOLDER_RELATIVE_PATH + "/" + newBookRequest.getCoverName()).toAbsolutePath().toString()).isFile()) {
    		Books book = newBooksAdminRequestMapper
    		    .newBooksAdminRequestToBooks(newBookRequest);
    		saveBook(book, newBookRequest.getGenresIds());
    		return new StatusResponseDTO(
    			"Книга добавлена",
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
						Paths.get(COVERS_FOLDER_RELATIVE_PATH + "/").toAbsolutePath().toString() 
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
			"Выберите обложку в формате png или jpg", 
			HttpStatus.BAD_REQUEST, 
			HttpStatus.BAD_REQUEST.value()
		);
	}
	
}

