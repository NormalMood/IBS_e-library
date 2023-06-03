package com.informationsystem.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ObjectResponseDTO {

    private List<?> objects;

    private Integer pages;

}
