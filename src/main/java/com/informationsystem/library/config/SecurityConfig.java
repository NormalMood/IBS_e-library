package com.informationsystem.library.config;

import com.informationsystem.library.handler.CustomAuthenticationSuccessHandler;
import com.informationsystem.library.model.APIRoutes;
import com.informationsystem.library.model.Role;
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

//@Configuration
//@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsService employeeDetailsService;

    @Autowired
    public SecurityConfig(@Qualifier("employeeDetailsServiceImpl") UserDetailsService userDetailsService){
        this.employeeDetailsService = userDetailsService;
    }
    
  //  @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	return http
    			.authorizeHttpRequests(requests -> 
    					requests
    						.requestMatchers(APIRoutes.EMPLOYEE_BIN_CONTROLLER_MAPPING + "/**")
    						.hasAnyAuthority(Role.ADMIN.name(), Role.USER.name())
    						.requestMatchers("/api/library/**")
    						.hasAnyAuthority(Role.ADMIN.name(), Role.USER.name())
    						.requestMatchers("/api/user/**")
    						.hasAnyAuthority(Role.ADMIN.name(), Role.USER.name())
    		                .requestMatchers(APIRoutes.ADMIN_CONTROLLER_MAPPING + "/**")
    		                .hasAuthority(Role.ADMIN.name())
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
    						.deleteCookies("JSESSIONID"))
    			.authenticationProvider(authenticationProvider())
    			.build();
    }
    
    //@Bean
	public AuthenticationProvider authenticationProvider() { //compare user's parameters
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(employeeDetailsService);
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

    //@Bean
    protected PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(16);
    }

}
