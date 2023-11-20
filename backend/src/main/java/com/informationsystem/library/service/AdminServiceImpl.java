package com.informationsystem.library.service;

import com.informationsystem.library.dto.response.ObjectResponseDTO;
import com.informationsystem.library.dto.response.StatusResponseDTO;
import com.informationsystem.library.entity.BinExpiredStatus;
import com.informationsystem.library.entity.CommonDetailedHistory;
import com.informationsystem.library.mapper.BooksExpiredStatusesMapper;
import com.informationsystem.library.repository.CommonDetailedHistoryRepository;
import com.informationsystem.library.repository.ExpiredStatusRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ObjectResponseDTO getDetailedHistory(Pageable pageable) {
        Page<CommonDetailedHistory> detailedHistory = commonDetailedHistoryRepository
                .findAll(pageable);
        return new ObjectResponseDTO(detailedHistory.toList(),
                        detailedHistory.getTotalPages());
    }

    @Override
    public Object getBookDetailedHistory(String bookId, Pageable pageable) {
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
        Page<CommonDetailedHistory> bookDetailedHistory = commonDetailedHistoryRepository
                .findAllByBookId(bookIdParsed, pageable);
        return new ObjectResponseDTO(bookDetailedHistory.toList(),
                        bookDetailedHistory.getTotalPages());
    }

    @Override
    public ObjectResponseDTO getBinExpiredStatuses(Pageable pageable) {
        Page<BinExpiredStatus> binExpiredStatus = expiredStatusRepository
                .findAll(pageable);
        return new ObjectResponseDTO(binExpiredStatus.toList(),
                        binExpiredStatus.getTotalPages());
    }

	@Override
	public ObjectResponseDTO getBinExpiredStatusesOnly(Pageable pageable) {
		Page<BinExpiredStatus> binExpiredStatusOnly = expiredStatusRepository
				.findByReturnDateExpiredTrue(pageable);
		return new ObjectResponseDTO(booksExpiredStatusesMapper
				.booksExpiredStatusesToBooksExpiredOnlyResponseDTOList(
						binExpiredStatusOnly
					),
				binExpiredStatusOnly.getTotalPages());
	}

}
