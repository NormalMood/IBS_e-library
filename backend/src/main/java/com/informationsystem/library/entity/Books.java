package com.informationsystem.library.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "books_num")
    private Long id;

    private String title;

    private String lastName;

    private String firstName;

    private String fatherName;

    @Column(name = "providers_num")
    private Short providersId;

    @Column(name = "statuses_num")
    private Short statusesId;
    
    private String coverName;
    
    private String description;

    public Books(String title, String lastName, String firstName,
                 String fatherName, Short providersId, Short statusesId, String coverName, String description){
        this.title = title;
        this.lastName = lastName;
        this.firstName = firstName;
        this.fatherName = fatherName;
        this.providersId = providersId;
        this.statusesId = statusesId;
        this.coverName = coverName;
        this.description = description;
    }

}
