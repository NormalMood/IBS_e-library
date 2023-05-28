package com.informationsystem.library.service;

import com.informationsystem.library.dto.request.ParameterSearchRequestDTO;
import com.informationsystem.library.dto.request.ParameterSortRequestDTO;
import com.informationsystem.library.dto.response.BinBooksResponseDTO;
import com.informationsystem.library.dto.response.EmployeeBinResponseDTO;
import com.informationsystem.library.dto.response.ObjectResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.*;
import com.informationsystem.library.mapper.EmployeeBinPageListMapper;
import com.informationsystem.library.model.*;
import com.informationsystem.library.repository.*;
import lombok.AllArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final EmployeeBinRepository employeeBinRepository;

    private final HistoryRepository historyRepository;

    private final BooksRepository booksRepository;

    private final VBooksRepository vBooksRepository;

    private final EmployeeBinPageListMapper employeeBinPageListMapper = Mappers.getMapper(EmployeeBinPageListMapper.class);

    @Override
    public Employee getCurrentEmployee() {
        String email = "ymvenediktov@ibs.ru";//SecurityContextHolder.getContext().getAuthentication().getName();
        return employeeRepository.findByEmail(email).get();
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
        Long currentEmployeeId = getCurrentEmployee().getId();
        for (Long bookId : booksIds) {
            historyRepository.save(
                    new History(currentEmployeeId, bookId, Action.ACTIONS.get(ActionsName.RETURN))
            );
            Books book = booksRepository.findById(bookId).get();
            book.setStatusesId(Status.STATUSES.get(StatusName.IN_STOCK));
            booksRepository.save(book);
        }
        return new StatusResponseDTO("Books were returned successfully",
                HttpStatus.OK, HttpStatus.OK.value());
    }

    @Override
    public StatusResponseDTO extendBooks(List<Long> booksIds) {
        Long currentEmployeeId = getCurrentEmployee().getId();
        for (Long bookId : booksIds) {
            historyRepository.save(
                    new History(currentEmployeeId, bookId, Action.ACTIONS.get(ActionsName.EXTEND))
            );
        }
        return new StatusResponseDTO("Return date was successfully extended",
                HttpStatus.OK, HttpStatus.OK.value());
    }
    //////////////////////

    //BooksCheckoutController
    @Override
    public ObjectResponseDTO getAllBooks(Pageable pageable) {
        Page<VBooks> libraryBooks = vBooksRepository
                .findAll(pageable);
        return new ObjectResponseDTO(libraryBooks.toList(), libraryBooks.getTotalPages());
    }

    @Override
    public ObjectResponseDTO getByParameter(ParameterSearchRequestDTO paramRequest,
                                            Pageable pageable) {
        Page<VBooks> searchResult;
        switch (paramRequest.getParameterName()) {
            case "title":
                searchResult = vBooksRepository
                        .findByTitleContainingIgnoreCase(paramRequest.getParameterValue(),
                                pageable);
                break;
            case "author":
                searchResult = vBooksRepository
                        .findByAuthorContainingIgnoreCase(paramRequest.getParameterValue(),
                                pageable);
                break;
            case "genres":
                searchResult = vBooksRepository
                        .findByGenresContainingIgnoreCase(paramRequest.getParameterValue(),
                                pageable);
                break;
            case "provider":
                searchResult = vBooksRepository
                        .findByProviderContainingIgnoreCase(paramRequest.getParameterValue(),
                                pageable);
                break;
            case "status":
                searchResult = vBooksRepository
                        .findByStatusContainingIgnoreCase(paramRequest.getParameterValue(),
                                pageable);
                break;
            default:
                searchResult = null;
                break;
        }
        return new ObjectResponseDTO(searchResult == null ? null : searchResult.toList(),
                searchResult == null ? 0 : searchResult.getTotalPages());
    }

    @Override
    public ObjectResponseDTO sortByParameter(ParameterSortRequestDTO paramRequest,
                                             Pageable pageable) {
        Page<VBooks> sortResult = null;
        if (paramRequest.getSortOrder() == SortOrder.ASC)
            sortResult = vBooksRepository
                    .findAll(PageRequest.of(pageable.getPageNumber(), 
                    		pageable.getPageSize(),
                            Sort.by(paramRequest
                            		.getParameterName())
                            		.ascending()));
        else if (paramRequest.getSortOrder() == SortOrder.DESC)
            sortResult = vBooksRepository
                    .findAll(PageRequest.of(pageable.getPageNumber(),
                    		pageable.getPageSize(),
                            Sort.by(paramRequest
                            		.getParameterName())
                            		.descending()));
        return new ObjectResponseDTO(sortResult.toList(),
                sortResult.getTotalPages());
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
    public StatusResponseDTO checkoutBooks(List<Long> booksIds) {
        Long currentEmployeeId = getCurrentEmployee().getId();
        for (Long bookId : booksIds) {
            if (isCheckoutPossible(bookId)) {
                historyRepository.save(
                        new History(currentEmployeeId, bookId, Action.ACTIONS.get(ActionsName.TAKE))
                );
                Books book = booksRepository.findById(bookId).get();
                book.setStatusesId(Status.STATUSES.get(StatusName.CHECKED_OUT));
                booksRepository.save(book);
            } else
                return new StatusResponseDTO("Checkout is unavailable",
                        HttpStatus.FORBIDDEN,
                        HttpStatus.FORBIDDEN.value());
        }
        return new StatusResponseDTO("Books were checked out successfully",
                HttpStatus.OK, HttpStatus.OK.value());
    }
    //////////////////////

}
