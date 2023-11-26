package com.informationsystem.library.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.informationsystem.library.entity.Statuses;

@Repository
public interface StatusesRepository extends JpaRepository<Statuses, Long> {

}
