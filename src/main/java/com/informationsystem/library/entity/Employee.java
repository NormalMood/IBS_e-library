package com.informationsystem.library.entity;

import com.informationsystem.library.model.Role;
import lombok.Data;

import javax.persistence.*;

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
