package com.informationsystem.library.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;

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
    private Integer actionId;

    private Date actionsDate;

    public History(Long employeeId, Long bookId, Integer actionId){
        this.employeeId = employeeId;
        this.bookId = bookId;
        this.actionId = actionId;
        LocalDate date = LocalDate.now();
        this.actionsDate = Date.valueOf(date.toString());
    }

}
