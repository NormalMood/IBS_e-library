package com.informationsystem.library.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Set;

import com.informationsystem.library.model.ProvidersName;

import jakarta.validation.constraints.NotEmpty;

@Data
@AllArgsConstructor
public class NewBooksUserRequestDTO {

    private String title;

    private String lastName;

    private String firstName;

    private String fatherName;
    
    private String description;

    private Set<Short> genresIds;
    
    private String coverName;

}
