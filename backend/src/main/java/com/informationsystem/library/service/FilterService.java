package com.informationsystem.library.service;

import java.util.List;

import com.informationsystem.library.entity.Providers;
import com.informationsystem.library.entity.Statuses;
import com.informationsystem.library.entity.VGenres;

public interface FilterService {
	
	List<VGenres> getAllGenres();
	
	List<Providers> getAllProviders();
	
	List<Statuses> getAllStatuses();

}
