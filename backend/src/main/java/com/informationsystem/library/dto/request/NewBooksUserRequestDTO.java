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

	@NotEmpty
    private String title;

	@NotEmpty
    private String lastName;

	@NotEmpty
    private String firstName;

    private String fatherName;
    
    @NotEmpty
    private String description;

    @NotEmpty
    private Set<Short> genresIds;
    
    @NotEmpty
    private String coverName;

}
