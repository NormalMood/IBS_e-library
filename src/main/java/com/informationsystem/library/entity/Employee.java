package com.informationsystem.library.entity;

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
public class Employee {

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

    public String getFullName(){
        return getLastName() + " "
                + getFirstName() + " "
                + getFatherName();
    }

}
