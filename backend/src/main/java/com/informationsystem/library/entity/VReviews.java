package com.informationsystem.library.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Entity
@Table(name = "v_reviews")
@Data
public class VReviews {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reviews_num")
    private Long id;
	
	@Column(name = "staff_num")
	private Long employeeId;
	
	@Column(name = "books_num")
	private Long bookId;
	
	private String lastName;
	
	private String firstName;
	
	private String pictureName;
	
	private String comment;
	
	@Min(1)
    @Max(5)
    private Short stars;
	
	private Date reviewsDate;

}
