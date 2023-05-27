package com.informationsystem.library.service;

import com.informationsystem.library.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
/*import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
*/
import java.util.*;

@Data
@AllArgsConstructor
public class EmployeeDetailsImpl/* implements UserDetails*/ {

    private final String email;

    private final String password;

   // @Override
   /* public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
    }*/

   // @Override
    public String getUsername() {
        return email;
    }

  //  @Override
    public String getPassword() {
        return password;
    }

   // @Override
    public boolean isAccountNonExpired() {
        return true;
    }

  //  @Override
    public boolean isAccountNonLocked() {
        return true;
    }

  //  @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

  //  @Override
    public boolean isEnabled() {
        return true;
    }

    /*public static UserDetails fromEmployee(Employee employee) {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(employee.getRole().name()));
        return new org.springframework.security.core.userdetails.User(
                employee.getEmail(),
                employee.getPassword(),
                authorities
        );
    }*/

}
