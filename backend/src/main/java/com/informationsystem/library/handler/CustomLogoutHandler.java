package com.informationsystem.library.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.session.data.redis.RedisIndexedSessionRepository;
import org.springframework.stereotype.Component;

import com.informationsystem.library.service.EmployeeService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {
	
	private final RedisIndexedSessionRepository sessionRepository;
		
	private final EmployeeService employeeService;

	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
		sessionRepository
			.findByPrincipalName(employeeService.getCurrentEmployee().getEmail())
			.keySet()
			.forEach(sessionRepository::deleteById);
	}

}
