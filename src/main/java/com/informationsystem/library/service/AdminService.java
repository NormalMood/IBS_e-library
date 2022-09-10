package com.informationsystem.library.service;

import com.informationsystem.library.dto.response.ObjectResponseDTO;

public interface AdminService {

    ObjectResponseDTO getDetailedHistory(Integer pageNum, Integer elementsPerPage);

    ObjectResponseDTO getBookDetailedHistory(Long bookId, Integer pageNum, Integer elementsPerPage);

    ObjectResponseDTO getBinExpiredStatuses(Integer pageNum, Integer elementsPerPage);

}
