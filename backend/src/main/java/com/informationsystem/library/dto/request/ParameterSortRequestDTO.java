package com.informationsystem.library.dto.request;

import com.informationsystem.library.model.SortOrder;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ParameterSortRequestDTO {

    private String parameterName;

    private SortOrder sortOrder;

}
