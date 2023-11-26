package com.informationsystem.library.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

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
