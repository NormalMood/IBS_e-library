package com.informationsystem.library.mapper;

import com.informationsystem.library.dto.request.NewBooksAdminRequestDTO;
import com.informationsystem.library.entity.Books;
import com.informationsystem.library.model.Provider;
import com.informationsystem.library.model.Status;
import com.informationsystem.library.model.StatusName;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(imports = {
        Provider.class,
        Status.class,
        StatusName.class
})
public interface NewBooksAdminRequestMapper {

    @Mapping(target = "providersId",
            expression = "java(Provider.PROVIDERS.get(newBooksAdminRequest.getProvider()))")
    @Mapping(target = "statusesId",
            expression = "java(Status.STATUSES.get(StatusName.IN_STOCK))")
    Books newBooksAdminRequestToBooks(NewBooksAdminRequestDTO newBooksAdminRequest);

}
