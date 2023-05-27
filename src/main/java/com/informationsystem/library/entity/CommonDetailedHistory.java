package com.informationsystem.library.entity;

import lombok.Data;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "v_admin_detailed_history")
@Data
public class CommonDetailedHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long id;

    private Long employeeId;

    @Column(name = "employee_fullname")
    private String employeeFullName;

    private Long bookId;

    private String title;

    private String author;

    private String actionsName;

    private Date actionsDate;

}
