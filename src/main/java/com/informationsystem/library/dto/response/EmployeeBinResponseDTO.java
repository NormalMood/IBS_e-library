package com.informationsystem.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class EmployeeBinResponseDTO {

    private String fullName;

    private List<BinBooksResponseDTO> books;

    private Integer pages;

}
