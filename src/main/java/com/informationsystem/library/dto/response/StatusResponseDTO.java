package com.informationsystem.library.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class StatusResponseDTO {

    private String message;

    private HttpStatus status;

    private Integer code;

}
