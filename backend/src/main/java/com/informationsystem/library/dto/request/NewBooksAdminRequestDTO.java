package com.informationsystem.library.dto.request;

import com.informationsystem.library.model.ProvidersName;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;


@Data
@AllArgsConstructor
public class NewBooksAdminRequestDTO {

    private String title;

    private String lastName;

    private String firstName;

    private String fatherName;
    
    private String description;

    private ProvidersName provider;

    private Set<Short> genresIds;
    
    private String coverName;

}
