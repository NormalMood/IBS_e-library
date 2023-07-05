package com.informationsystem.library.service;

import com.informationsystem.library.entity.Employee;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.informationsystem.library.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;

import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeDetailsServiceImpl implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Employee employee = employeeRepository.findByEmail(email).orElse(null);
		if (employee == null) {
			throw new UsernameNotFoundException("User with email " + email + " not found!");
		}
		return new org.springframework.security.core.userdetails.User(
					employee.getUsername(),
					employee.getPassword(),
					employee.getAuthorities()
						.stream()
						.map(role -> new SimpleGrantedAuthority(role.getAuthority()))
						.collect(Collectors.toSet())
				);
	}

}
