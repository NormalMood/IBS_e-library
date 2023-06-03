package com.informationsystem.library.mapper;

import com.informationsystem.library.dto.request.NewBooksUserRequestDTO;
import com.informationsystem.library.entity.Books;
import com.informationsystem.library.model.Provider;
import com.informationsystem.library.model.ProvidersName;
import com.informationsystem.library.model.Status;
import com.informationsystem.library.model.StatusName;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(imports = {
        Provider.class,
        ProvidersName.class,
        Status.class,
        StatusName.class
})
public interface NewBooksUserRequestMapper {

    @Mapping(target = "providersId",
            expression = "java(Provider.PROVIDERS.get(ProvidersName.employee))")
    @Mapping(target = "statusesId",
            expression = "java(Status.STATUSES.get(StatusName.IN_STOCK))")
    Books newBooksUserRequestToBooks(NewBooksUserRequestDTO newBooksUserRequest);

}
