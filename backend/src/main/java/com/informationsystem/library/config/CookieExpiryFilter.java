package com.informationsystem.library.config;

import java.io.IOException;

import org.springframework.web.filter.GenericFilterBean;

import com.informationsystem.library.model.CookieExpiry;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CookieExpiryFilter extends GenericFilterBean {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		Cookie[] cookies = httpRequest.getCookies();
		HttpServletResponse httpResponse = (HttpServletResponse)response;
		if (cookies != null) {
			for (Cookie cookie: cookies) {
				if (cookie.getName().contentEquals("SESSION")) {
					if (cookie.getValue().contentEquals(httpRequest.getSession().getId())) {
						cookie.setMaxAge(CookieExpiry.MAX_AGE);
						cookie.setPath("/");
						httpResponse.addCookie(cookie);
						break;
					}
				}
			}
		}
		chain.doFilter(request, response);
	}

}
