package com.informationsystem.library.service;

import com.informationsystem.library.dto.response.ObjectResponseDTO;
import com.informationsystem.library.entity.BinExpiredStatus;
import com.informationsystem.library.entity.CommonDetailedHistory;
import com.informationsystem.library.repository.CommonDetailedHistoryRepository;
import com.informationsystem.library.repository.ExpiredStatusRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final CommonDetailedHistoryRepository commonDetailedHistoryRepository;

    private final ExpiredStatusRepository expiredStatusRepository;

    @Override
    public ObjectResponseDTO getDetailedHistory(Integer pageNum, Integer elementsPerPage) {
        Page<CommonDetailedHistory> detailedHistory = commonDetailedHistoryRepository
                .findAll(PageRequest.of(pageNum, elementsPerPage));
        return new ObjectResponseDTO(detailedHistory.toList(),
                        detailedHistory.getTotalPages());
    }

    @Override
    public ObjectResponseDTO getBookDetailedHistory(Long bookId, Integer pageNum, Integer elementsPerPage) {
        Page<CommonDetailedHistory> bookDetailedHistory = commonDetailedHistoryRepository
                .findAllByBookId(bookId, PageRequest.of(pageNum, elementsPerPage));
        return new ObjectResponseDTO(bookDetailedHistory.toList(),
                        bookDetailedHistory.getTotalPages());
    }

    @Override
    public ObjectResponseDTO getBinExpiredStatuses(Integer pageNum, Integer elementsPerPage) {
        Page<BinExpiredStatus> binExpiredStatus = expiredStatusRepository
                .findAll(PageRequest.of(pageNum, elementsPerPage));
        return new ObjectResponseDTO(binExpiredStatus.toList(),
                        binExpiredStatus.getTotalPages());
    }

}
