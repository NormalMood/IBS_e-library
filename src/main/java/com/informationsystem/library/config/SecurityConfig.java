package com.informationsystem.library.config;

import com.informationsystem.library.handler.CustomAuthenticationSuccessHandler;
import com.informationsystem.library.model.APIRoutes;
import com.informationsystem.library.model.Role;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsService employeeDetailsService;
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	return http
    			.authorizeHttpRequests(requests -> 
    					requests
    						.requestMatchers(APIRoutes.EMPLOYEE_BIN_CONTROLLER_MAPPING + "/**")
    						.hasAnyAuthority(Role.ADMIN.getAuthority(), Role.USER.getAuthority())
    						.requestMatchers("/api/library/**")
    						.hasAnyAuthority(Role.ADMIN.getAuthority(), Role.USER.getAuthority())
    						.requestMatchers("/api/user/**")
    						.hasAnyAuthority(Role.ADMIN.getAuthority(), Role.USER.getAuthority())
    		                .requestMatchers(APIRoutes.ADMIN_CONTROLLER_MAPPING + "/**")
    		                .hasAuthority(Role.ADMIN.getAuthority())
    						.anyRequest()
    						.authenticated())
    			.formLogin(form ->
    					form
    						.successHandler(new CustomAuthenticationSuccessHandler()))
    			.logout(configurer ->
    					configurer
    						.logoutSuccessUrl("/login")
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
