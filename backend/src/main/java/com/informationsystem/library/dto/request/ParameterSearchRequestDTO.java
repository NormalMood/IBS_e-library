package com.informationsystem.library.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ParameterSearchRequestDTO {

    private String parameterName;

    private String parameterValue;

}
