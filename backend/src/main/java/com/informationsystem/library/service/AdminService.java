package com.informationsystem.library.service;

import org.springframework.data.domain.Pageable;

import com.informationsystem.library.dto.response.ObjectResponseDTO;

public interface AdminService {

    ObjectResponseDTO getDetailedHistory(Pageable pageable);

    Object getBookDetailedHistory(String bookId, Pageable pageable);

    ObjectResponseDTO getBinExpiredStatuses(Pageable pageable);

	ObjectResponseDTO getBinExpiredStatusesOnly(Pageable pageable);

}
