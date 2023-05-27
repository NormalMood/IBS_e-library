package com.informationsystem.library.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "history")
@Data
@NoArgsConstructor
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_num")
    private Long id;

    @Column(name = "staff_num")
    private Long employeeId;

    @Column(name = "books_num")
    private Long bookId;

    @Column(name = "actions_num")
    private Short actionId;

    private Date actionsDate;

    public History(Long employeeId, Long bookId, Short actionId){
        this.employeeId = employeeId;
        this.bookId = bookId;
        this.actionId = actionId;
        LocalDate date = LocalDate.now();
        this.actionsDate = Date.valueOf(date.toString());
    }

}
