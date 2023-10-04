package com.informationsystem.library.entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;

import org.springframework.data.redis.core.RedisHash;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.informationsystem.library.model.Position;
import com.informationsystem.library.model.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "v_staff")
@Data
public class Employee implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_num")
    private Long id;

    private String lastName;

    private String firstName;

    private String fatherName;

    @Column(name = "login")
    private String email;

    private String password;

    @Enumerated(value = EnumType.STRING)
    private Role role;
    
    @Enumerated(value = EnumType.STRING)
    private Position position;

    public String getFullName(){
        return getLastName() + " "
                + getFirstName() + " "
                + getFatherName();
    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singleton(this.role);
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
