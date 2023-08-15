package com.informationsystem.library.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
	public List<String> getAllGenres() {
		return vGenresRepository.findAllGenre();
	}

	@Override
	public List<String> getAllProviders() {
		return providersRepository.findAllName();
	}

	@Override
	public List<String> getAllStatuses() {
		return statusesRepository.findAllName();
	}

}
