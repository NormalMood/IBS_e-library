package com.informationsystem.library.dto.request;

import com.informationsystem.library.model.ProvidersName;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;


@Data
@AllArgsConstructor
public class NewBooksAdminRequestDTO {

	@NotEmpty
    private String title;

	@NotEmpty
    private String lastName;

	@NotEmpty
    private String firstName;

    private String fatherName;
    
    @NotEmpty
    private String description;

    private ProvidersName provider;

    @NotEmpty
    private Set<Short> genresIds;
    
    @NotEmpty
    private String coverName;

}
