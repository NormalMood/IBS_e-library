package com.informationsystem.library.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    private Integer providersId;

    @Column(name = "statuses_num")
    private Integer statusesId;

    public Books(String title, String lastName, String firstName,
                 String fatherName, Integer providersId, Integer statusesId){
        this.title = title;
        this.lastName = lastName;
        this.firstName = firstName;
        this.fatherName = fatherName;
        this.providersId = providersId;
        this.statusesId = statusesId;
    }

}
