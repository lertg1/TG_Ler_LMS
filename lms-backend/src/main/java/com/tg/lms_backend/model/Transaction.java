package com.tg.lms_backend.model;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_transactions")

public class Transaction {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int transactionId;
private String transactionType;
private Date transactionDate;
@ManyToOne
@JoinColumn(name ="user_id",  nullable = false)
private User userId;
@ManyToOne
@JoinColumn(name="book_id", nullable = false)
private Book bookId;
private Date dueDate;
private Date returnedDate;

// Constructor
public Transaction() {
	
};

public Transaction(int transactionId, String transactionType, Date transactionDate, User userId, Book bookId,
		Date dueDate, Date returnedDate) {
	super();
	this.transactionId = transactionId;
	this.transactionType = transactionType;
	this.transactionDate = transactionDate;
	this.userId = userId;
	this.bookId = bookId;
	this.dueDate = dueDate;
	this.returnedDate = returnedDate;
}

public int getTransactionId() {
	return transactionId;
}

public void setTransactionId(int transactionId) {
	this.transactionId = transactionId;
}

public String getTransactionType() {
	return transactionType;
}

public void setTransactionType(String transactionType) {
	this.transactionType = transactionType;
}

public Date getTransactionDate() {
	return transactionDate;
}

public void setTransactionDate(Date transactionDate) {
	this.transactionDate = transactionDate;
}

public User getUserId() {
	return userId;
}

public void setUserId(User userId) {
	this.userId = userId;
}

public Book getBookId() {
	return bookId;
}

public void setBookId(Book bookId) {
	this.bookId = bookId;
}

public Date getDueDate() {
	return dueDate;
}

public void setDueDate(Date dueDate) {
	this.dueDate = dueDate;
}

public Date getReturnedDate() {
	return returnedDate;
}

public void setReturnedDate(Date returnedDate) {
	this.returnedDate = returnedDate;
}



}


