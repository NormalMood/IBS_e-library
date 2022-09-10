package com.informationsystem.library.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "v_admin_bin_expired_status")
@Data
public class BinExpiredStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bin_id")
    private Long id;

    private Long employeeId;

    @Column(name = "employee_fullname")
    private String employeeFullName;

    private Long bookId;

    private String title;

    private String author;

    private String actionsName;

    private Date actionsDate;

    private Date returnDate;

    private Boolean returnDateExpired;

}
