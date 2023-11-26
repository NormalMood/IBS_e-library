package com.informationsystem.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.informationsystem.library.entity.Providers;

@Repository
public interface ProvidersRepository extends JpaRepository<Providers, Long> {

}
