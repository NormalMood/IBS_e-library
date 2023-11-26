package com.informationsystem.library.service;

import com.informationsystem.library.dto.response.BooksExpiredOnlyResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.BinExpiredStatus;
import com.informationsystem.library.entity.CommonDetailedHistory;
import com.informationsystem.library.mapper.BooksExpiredStatusesMapper;
import com.informationsystem.library.model.StatusName;
import com.informationsystem.library.repository.CommonDetailedHistoryRepository;
import com.informationsystem.library.repository.ExpiredStatusRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final CommonDetailedHistoryRepository commonDetailedHistoryRepository;

    private final ExpiredStatusRepository expiredStatusRepository;
    
    private final BooksExpiredStatusesMapper booksExpiredStatusesMapper =
    		Mappers.getMapper(BooksExpiredStatusesMapper.class);

    @Override
    public Object getHistory(String bookId) {
    	if (bookId == null)
    		return getDetailedHistory();
    	return getBookDetailedHistory(bookId);
    }
    
    @Override
    public Object getDetailedHistory() {
        List<CommonDetailedHistory> detailedHistory = commonDetailedHistoryRepository
                .findAll();
        return detailedHistory;
    }

    @Override
    public Object getBookDetailedHistory(String bookId) {
    	Long bookIdParsed;
    	try {
    		bookIdParsed = Long.parseLong(bookId);
    		if (bookIdParsed < 1)
    			return new StatusResponseDTO(
        				"Введите целое число больше 0", 
        				HttpStatus.BAD_REQUEST, 
        				HttpStatus.BAD_REQUEST.value()
        			);
    	} catch(Exception e) {
    		return new StatusResponseDTO(
    				"Введите целое число больше 0", 
    				HttpStatus.BAD_REQUEST, 
    				HttpStatus.BAD_REQUEST.value()
    			);
    	}
        List<CommonDetailedHistory> bookDetailedHistory = commonDetailedHistoryRepository
                .findAllByBookId(bookIdParsed);
        return bookDetailedHistory;
    }
    
    @Override
    public Object getCheckoutedBooks(StatusName status) {
    	if (status != null && status.equals(StatusName.EXPIRED))
    		return getBinExpiredStatusesOnly();
    	return getBinExpiredStatuses();
    }

    @Override
    public List<BinExpiredStatus> getBinExpiredStatuses() {
        List<BinExpiredStatus> binExpiredStatus = expiredStatusRepository
                .findAll();
        return binExpiredStatus;
    }

	@Override
	public List<BooksExpiredOnlyResponseDTO> getBinExpiredStatusesOnly() {
		List<BinExpiredStatus> binExpiredStatusOnly = expiredStatusRepository
				.findByReturnDateExpiredTrue();
		return booksExpiredStatusesMapper
				.booksExpiredStatusesToBooksExpiredOnlyResponseDTOList(
						binExpiredStatusOnly
			);
	}

}
