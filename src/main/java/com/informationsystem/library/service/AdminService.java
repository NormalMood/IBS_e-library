package com.informationsystem.library.service;

import org.springframework.data.domain.Pageable;

import com.informationsystem.library.dto.response.ObjectResponseDTO;

public interface AdminService {

    ObjectResponseDTO getDetailedHistory(Pageable pageable);

    ObjectResponseDTO getBookDetailedHistory(Long bookId, Pageable pageable);

    ObjectResponseDTO getBinExpiredStatuses(Pageable pageable);

}
