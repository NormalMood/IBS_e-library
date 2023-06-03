package com.informationsystem.library.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import org.springframework.data.domain.Page;
import com.informationsystem.library.dto.response.BooksExpiredOnlyResponseDTO;
import com.informationsystem.library.entity.BinExpiredStatus;

@Mapper
public interface BooksExpiredStatusesMapper {
	
	List<BooksExpiredOnlyResponseDTO> booksExpiredStatusesToBooksExpiredOnlyResponseDTOList(
			Page<BinExpiredStatus> booksExpiredStatuses);

}
