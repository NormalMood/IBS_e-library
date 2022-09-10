package com.informationsystem.library.config;

import com.informationsystem.library.handler.CustomAuthenticationSuccessHandler;
import com.informationsystem.library.model.APIRoutes;
import com.informationsystem.library.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService employeeDetailsService;

    @Autowired
    public SecurityConfig(@Qualifier("employeeDetailsServiceImpl") UserDetailsService userDetailsService){
        this.employeeDetailsService = userDetailsService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(APIRoutes.EMPLOYEE_BIN_CONTROLLER_MAPPING + "/**").hasAnyAuthority(Role.ADMIN.name(), Role.USER.name())
                .antMatchers("/api/library/**").hasAnyAuthority(Role.ADMIN.name(), Role.USER.name())
                .antMatchers("/api/user/**").hasAnyAuthority(Role.ADMIN.name(), Role.USER.name())
                .antMatchers(APIRoutes.ADMIN_CONTROLLER_MAPPING + "/**").hasAuthority(Role.ADMIN.name())
                .anyRequest()
                .authenticated()
                .and()
                .logout()
                .logoutSuccessUrl("/login")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID")
                .and()
                .formLogin(formLogin -> formLogin
                        .successHandler(new CustomAuthenticationSuccessHandler()))
                .httpBasic();
    }

    @Bean
    protected PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(16);
    }

}
