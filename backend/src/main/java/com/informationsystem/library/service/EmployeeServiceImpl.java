package com.informationsystem.library.service;

import com.informationsystem.library.dto.response.BinBooksResponseDTO;
import com.informationsystem.library.dto.response.EmployeeBinResponseDTO;
import com.informationsystem.library.dto.response.EmployeeResponseDTO;
import com.informationsystem.library.dto.response.ForbiddenExtendingsResponseDTO;
import com.informationsystem.library.dto.response.ObjectResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.Employee;
import com.informationsystem.library.entity.EmployeeBin;
import com.informationsystem.library.entity.History;
import com.informationsystem.library.entity.Books;
import com.informationsystem.library.entity.VBooks;
import com.informationsystem.library.mapper.EmployeeBinPageListMapper;
import com.informationsystem.library.model.Status;
import com.informationsystem.library.model.StatusName;
import com.informationsystem.library.model.Action;
import com.informationsystem.library.model.ActionsName;
import com.informationsystem.library.repository.EmployeeRepository;
import com.informationsystem.library.repository.EmployeeBinRepository;
import com.informationsystem.library.repository.HistoryRepository;
import com.informationsystem.library.repository.BooksRepository;
import com.informationsystem.library.repository.VBooksRepository;
import lombok.RequiredArgsConstructor;

import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final EmployeeBinRepository employeeBinRepository;

    private final HistoryRepository historyRepository;

    private final BooksRepository booksRepository;

    private final VBooksRepository vBooksRepository;

    private final EmployeeBinPageListMapper employeeBinPageListMapper = Mappers.getMapper(EmployeeBinPageListMapper.class);

    @Override
    public Employee getCurrentEmployee() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return employeeRepository.findByEmail(email);
    }
    
    @Override
    public EmployeeResponseDTO getUserData() {
    	Employee currentEmployee = getCurrentEmployee();
    	return new EmployeeResponseDTO(
    			currentEmployee.getId(),
    			currentEmployee.getFullName(), 
    			currentEmployee.getRole(), 
    			currentEmployee.getPosition(),
    			currentEmployee.getPictureName()
    	);
    }

    //EmployeeBinController

    @Override
    public EmployeeBinResponseDTO getBinData(Pageable pageable) {
        Employee currentEmployee = getCurrentEmployee();
        Page<EmployeeBin> employeeBin = employeeBinRepository
                .findByEmployeeId(currentEmployee.getId(), pageable);
        List<BinBooksResponseDTO> currentEmployeeBooks = employeeBinPageListMapper
                .employeeBinPageToBinBooksResponseDTOList(employeeBin);
        return new EmployeeBinResponseDTO(currentEmployee.getFullName(),
                currentEmployeeBooks,
                employeeBin.getTotalPages());
    }

    @Override
    public StatusResponseDTO returnBooks(List<Long> booksIds) {
    	if (booksIds == null || booksIds.size() == 0)
    		return new StatusResponseDTO("Выберите книгу(и)",
                    HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST.value());
        Long currentEmployeeId = getCurrentEmployee().getId();
        saveActionOnBook(currentEmployeeId, booksIds, Action.ACTIONS.get(ActionsName.RETURN));
        for (Long bookId : booksIds) {
            Books book = booksRepository.findById(bookId).get();
            book.setStatusesId(Status.STATUSES.get(StatusName.IN_STOCK));
            booksRepository.save(book);
        }
        return new StatusResponseDTO("Книга(и) возвращена(ы)",
                HttpStatus.OK, HttpStatus.OK.value());
    }

    @Override
    public StatusResponseDTO extendBooks(List<Long> booksIds) {
    	if (booksIds == null || booksIds.size() == 0)
    		return new StatusResponseDTO("Выберите книгу(и)",
                    HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST.value());
        Long currentEmployeeId = getCurrentEmployee().getId();
        List<String> forbiddenExtendings = new ArrayList<>();
        for (Long bookId : booksIds) {
        	History lastCheckoutedBook = historyRepository
        			.findLastCheckoutedBook(currentEmployeeId, bookId);
        	History lastExtendedBookRow = historyRepository
        			.findLastExtendedBookRow(currentEmployeeId, 
        					bookId, 
        					lastCheckoutedBook
        						.getId());
        	if (lastExtendedBookRow != null)
        		forbiddenExtendings.add(booksRepository
        				.findById(bookId)
        				.get()
        				.getTitle());
        	else {
        		History extendedBook = new History(
            			currentEmployeeId,
            			bookId, 
            			Action.ACTIONS.get(ActionsName.EXTEND));
        		extendedBook.setReturnDate(Date
        				.valueOf(lastCheckoutedBook
        						.getReturnDate()
        						.toLocalDate()
        						.plusDays(14)
        						.toString()));
        		historyRepository.save(extendedBook);
        	}	
        }
        if (forbiddenExtendings.size() > 0)
        	return new StatusResponseDTO("Книга(и) уже продлена(ы): " + String.join(", ", forbiddenExtendings), 
        			HttpStatus.BAD_REQUEST, 
        			HttpStatus.BAD_REQUEST.value());
        return new StatusResponseDTO("Книга(и) продлена(ы)",
                HttpStatus.OK, HttpStatus.OK.value());
    }
    
    @Override
	public void saveActionOnBook(Long employeeId, List<Long> booksIds, Short actionId) {
    	for (Long bookId : booksIds) {
            historyRepository.save(
                    new History(employeeId, bookId, actionId)
            );
    	}
	}
    
    //////////////////////

    //BooksCheckoutController
    @Override
    public Object getAllBooks(
    		String genres, 
    		Set<String> providers,
    		Set<String> status,
    		String averageRatingFrom,
    		String averageRatingTo,
    		String sortingField,
    		String sortingOrder,
    		Pageable pageable) {
    	
    	Float averageRatingFromParsed = getAverageRatingParsed(averageRatingFrom);
    	if (averageRatingFromParsed != null && averageRatingFromParsed == -1)
    		return new StatusResponseDTO(
    			"Введите число от 1.0 до 5.0", 
    			HttpStatus.BAD_REQUEST, 
    			HttpStatus.BAD_REQUEST.value()
    		);
    	
    	Float averageRatingToParsed = getAverageRatingParsed(averageRatingTo);
    	if (averageRatingToParsed != null && averageRatingToParsed == -1)
    		return new StatusResponseDTO(
    			"Введите число от 1.0 до 5.0", 
    			HttpStatus.BAD_REQUEST, 
    			HttpStatus.BAD_REQUEST.value()
    		);
    	
    	Sort sort = Sort.unsorted();
    	if (!sortingField.equals("NONE"))
    		sort = Sort
    			.by(
    					Direction
    						.fromString(sortingOrder), 
    					sortingField
    				);
        Page<VBooks> libraryBooks = vBooksRepository
        		.findAllFilteredAndSorted(
        				genres.isEmpty() ? null : genres, 
        				providers.isEmpty() ? null : providers, 
        				status.isEmpty() ? null : status, 
        				averageRatingFromParsed, 
        				averageRatingToParsed, 
        				PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort)
        			);
        return new ObjectResponseDTO(libraryBooks.toList(), libraryBooks.getTotalPages());
    }
    
    @Override
    public ObjectResponseDTO getTop10Books(Pageable pageable) {
    	Page<VBooks> top10Books = vBooksRepository
    			.findTop10Books(pageable);
    	return new ObjectResponseDTO(top10Books.toList(), top10Books.getTotalPages());
    }
    
    @Override
	public Object getBooksBySearchQuery(
			String searchQuery, 
			String genres, 
			Set<String> providers,
			Set<String> status, 
			String averageRatingFrom, 
			String averageRatingTo, 
			String sortingField,
			String sortingOrder, 
			Pageable pageable) {
    	
    	Float averageRatingFromParsed = getAverageRatingParsed(averageRatingFrom);
    	if (averageRatingFromParsed != null && averageRatingFromParsed == -1)
    		return new StatusResponseDTO(
    			"Введите число от 1.0 до 5.0", 
    			HttpStatus.BAD_REQUEST, 
    			HttpStatus.BAD_REQUEST.value()
    		);
    	
    	Float averageRatingToParsed = getAverageRatingParsed(averageRatingTo);
    	if (averageRatingToParsed != null && averageRatingToParsed == -1)
    		return new StatusResponseDTO(
    			"Введите число от 1.0 до 5.0", 
    			HttpStatus.BAD_REQUEST, 
    			HttpStatus.BAD_REQUEST.value()
    		);
    	
    	Sort sort = Sort.unsorted();
    	if (!sortingField.equals("NONE"))
    		sort = Sort
    			.by(
    					Direction
    						.fromString(sortingOrder), 
    					sortingField
    				);
        Page<VBooks> libraryBooks = vBooksRepository
        		.findBySearchQueryFilteredAndSorted(
        				searchQuery,
        				genres.isEmpty() ? null : genres, 
        				providers.isEmpty() ? null : providers, 
        				status.isEmpty() ? null : status, 
        				averageRatingFromParsed, 
        				averageRatingToParsed, 
        				PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort)
        			);
        return new ObjectResponseDTO(libraryBooks.toList(), libraryBooks.getTotalPages());
	}
    
    @Override
    public Float getAverageRatingParsed(String averageRating) {
    	if (!averageRating.isBlank())
	    	try {
	    		Float averageRatingParsed = Float.parseFloat(averageRating);
	    		if (averageRatingParsed < 1 || averageRatingParsed > 5)
	    			return -1.0f;
	    		return averageRatingParsed;
	    			
	    	} catch(Exception e) {
	    		return -1.0f;
	    	}
    	return null;
    }

    @Override
    public boolean isCheckoutPossible(Long bookId) {
        Short bookStatusId = booksRepository
                .findById(bookId)
                .get()
                .getStatusesId();
        return (!bookStatusId.equals(Status.STATUSES.get(StatusName.CHECKED_OUT))) &&
                (!bookStatusId.equals(Status.STATUSES.get(StatusName.LOST))) &&
                (!bookStatusId.equals(Status.STATUSES.get(StatusName.TAKEN_OUT)));
    }

    @Override
    public StatusResponseDTO checkoutBook(Long bookId) {
        Long currentEmployeeId = getCurrentEmployee().getId();
        if (isCheckoutPossible(bookId)) {
            historyRepository.save(
                    new History(currentEmployeeId, bookId, Action.ACTIONS.get(ActionsName.TAKE))
            );
            Books book = booksRepository.findById(bookId).get();
            book.setStatusesId(Status.STATUSES.get(StatusName.CHECKED_OUT));
            booksRepository.save(book);
        } else
            return new StatusResponseDTO("Книгу нельзя брать",
                    HttpStatus.FORBIDDEN,
                    HttpStatus.FORBIDDEN.value());
        return new StatusResponseDTO("Добавлена в корзину",
                HttpStatus.OK, HttpStatus.OK.value());
    }

	@Override
	public VBooks getBookDataById(Long bookId) {
		return vBooksRepository.findById(bookId);
	}

    //////////////////////

}
