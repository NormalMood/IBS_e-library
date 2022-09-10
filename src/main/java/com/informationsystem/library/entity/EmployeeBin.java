package com.informationsystem.library.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "v_employee_bin")
@Data
public class EmployeeBin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bin_id")
    private Long id;

    private Long employeeId;

    private Long bookId;

    private String title;

    private String author;

    private String genres;

    private String actionsName;

    private Date actionsDate;

    private Date returnDate;

}
