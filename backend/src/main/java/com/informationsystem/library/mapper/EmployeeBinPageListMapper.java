package com.informationsystem.library.mapper;

import com.informationsystem.library.dto.response.BinBooksResponseDTO;
import com.informationsystem.library.entity.EmployeeBin;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper
public interface EmployeeBinPageListMapper {

    List<BinBooksResponseDTO> employeeBinPageToBinBooksResponseDTOList (List<EmployeeBin> employeeBinList);

}
