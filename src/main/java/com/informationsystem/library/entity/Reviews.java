package com.informationsystem.library.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
public class Reviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviews_num")
    private Long id;

    @Column(name = "staff_num")
    private Long employeeId;

    @Column(name = "books_num")
    private Long bookId;

    @Min(1)
    @Max(5)
    private Integer stars;

    private String advantages;

    private String disadvantages;

    private String comment;

    private Date reviewsDate;

}
