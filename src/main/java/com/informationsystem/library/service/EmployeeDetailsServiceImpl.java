package com.informationsystem.library.service;

import com.informationsystem.library.entity.Employee;
import com.informationsystem.library.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("employeeDetailsServiceImpl")
@AllArgsConstructor
public class EmployeeDetailsServiceImpl implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException("Employee doesn't exist"));
        return EmployeeDetailsImpl.fromEmployee(employee);
    }

}
