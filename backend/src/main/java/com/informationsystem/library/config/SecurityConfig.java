package com.informationsystem.library.config;

import com.informationsystem.library.handler.CustomAuthenticationSuccessHandler;
import com.informationsystem.library.handler.CustomLogoutHandler;
import com.informationsystem.library.model.APIRoutes;
import com.informationsystem.library.model.Role;
import com.informationsystem.library.service.EmployeeService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.session.data.redis.RedisIndexedSessionRepository;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsService employeeDetailsService;
    
    private final RedisIndexedSessionRepository sessionRepository;
	
   	private final EmployeeService employeeService;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	return http
    			.cors()
    			.configurationSource(request -> {
    				CorsConfiguration cors = new CorsConfiguration();
    				cors.setAllowedOrigins(List.of("http://localhost:3000", "http://127.0.0.1:3000"));
    				cors.setAllowedMethods(List.of("GET", "POST", "OPTIONS", "DELETE", "PUT"));
    				cors.setAllowCredentials(true);
    				cors.setExposedHeaders(List.of("*"));
    				cors.setAllowedHeaders(List.of("*"));
    				return cors;
    			})
    			.and()
    			.csrf().disable()
    			.addFilterBefore(new CookieExpiryFilter(), BasicAuthenticationFilter.class)
    			.authorizeHttpRequests(requests -> 
    					requests
    						.requestMatchers(APIRoutes.NEW_BOOK_USER_PATH)
    						.hasAnyAuthority(Role.ADMIN.getAuthority(), Role.USER.getAuthority())
    						.requestMatchers(APIRoutes.NEW_BOOK_ADMIN_PATH)
    						.hasAnyAuthority(Role.ADMIN.getAuthority())
    						.requestMatchers(APIRoutes.NEW_BOOK_COVER_PATH)
    						.hasAnyAuthority(Role.ADMIN.getAuthority(), Role.USER.getAuthority())
    						.requestMatchers(APIRoutes.ADMIN_PANEL_PATH + "/**")
    						.hasAnyAuthority(Role.ADMIN.getAuthority())
    						.requestMatchers(APIRoutes.REVIEWS_PATH + "/**")
    						.hasAnyAuthority(Role.ADMIN.getAuthority(), Role.USER.getAuthority())
    		                .requestMatchers(APIRoutes.LIBRARY_PATH + "/**")
    		                .hasAnyAuthority(Role.ADMIN.getAuthority(), Role.USER.getAuthority())
    		                .requestMatchers(APIRoutes.BOOKS_BIN_PATH)
    		                .hasAnyAuthority(Role.ADMIN.getAuthority(), Role.USER.getAuthority())
    		                .requestMatchers(APIRoutes.USER_DATA_PATH)
    		                .hasAnyAuthority(Role.ADMIN.getAuthority(), Role.USER.getAuthority())
    		                .requestMatchers(APIRoutes.FILTERS_PATH)
    		                .hasAnyAuthority(Role.ADMIN.getAuthority(), Role.USER.getAuthority())
    						.anyRequest()
    						.authenticated())
    			.formLogin(form ->
    					form
    						.successHandler(new CustomAuthenticationSuccessHandler()))
    			.logout(configurer ->
    					configurer
    						.logoutSuccessUrl("/login")
    						.addLogoutHandler(new CustomLogoutHandler(sessionRepository, employeeService))
    						.invalidateHttpSession(true)
    						.clearAuthentication(true)
    						.deleteCookies("SESSION"))
    			.authenticationProvider(authenticationProvider())
    			.build();
    }
    
    @Bean
	public AuthenticationProvider authenticationProvider() { //compare user's parameters
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(employeeDetailsService);
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

    @Bean
    protected PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(16);
    }

}
