package com.informationsystem.library.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.informationsystem.library.entity.Providers;
import com.informationsystem.library.entity.Statuses;
import com.informationsystem.library.entity.VGenres;
import com.informationsystem.library.repository.ProvidersRepository;
import com.informationsystem.library.repository.StatusesRepository;
import com.informationsystem.library.repository.VGenresRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FilterServiceImpl implements FilterService {
	
	private final VGenresRepository vGenresRepository;
	
	private final ProvidersRepository providersRepository;
	
	private final StatusesRepository statusesRepository;
	
	@Override
	public List<VGenres> getAllGenres() {
		return vGenresRepository.findAll();
	}

	@Override
	public List<Providers> getAllProviders() {
		return providersRepository.findAll();
	}

	@Override
	public List<Statuses> getAllStatuses() {
		return statusesRepository.findAll();
	}

}
