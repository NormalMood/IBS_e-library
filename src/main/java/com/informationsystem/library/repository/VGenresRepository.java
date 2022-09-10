package com.informationsystem.library.repository;

import com.informationsystem.library.entity.VGenres;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VGenresRepository extends PagingAndSortingRepository<VGenres, Long> {
}
