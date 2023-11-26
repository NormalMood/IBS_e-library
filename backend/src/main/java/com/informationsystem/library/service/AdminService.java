package com.informationsystem.library.service;


import java.util.List;

import com.informationsystem.library.dto.response.BooksExpiredOnlyResponseDTO;
import com.informationsystem.library.entity.BinExpiredStatus;
import com.informationsystem.library.model.StatusName;

public interface AdminService {
	
	Object getHistory(String bookId);

    Object getDetailedHistory();

    Object getBookDetailedHistory(String bookId);
    
    Object getCheckoutedBooks(StatusName status);

    List<BinExpiredStatus> getBinExpiredStatuses();

    List<BooksExpiredOnlyResponseDTO> getBinExpiredStatusesOnly();

}
