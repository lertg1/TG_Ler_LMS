package com.tg.lms_backend.model;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_transactions")

public class Transaction {
@Id
private int transactionId;
private String transactionType;
private Date transactionDate;
@ManyToOne
private User userID;
@ManyToOne
private Book bookID;
private Date dueDate;
private Date returnedDate;

// Constructor
public Transaction() {
	
};

public Transaction(int transactionId, String transactionType, Date transactionDate, User userID, Book bookID,
		Date dueDate, Date returnedDate) {
	super();
	this.transactionId = transactionId;
	this.transactionType = transactionType;
	this.transactionDate = transactionDate;
	this.userID = userID;
	this.bookID = bookID;
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

public User getUserID() {
	return userID;
}

public void setUserID(User userID) {
	this.userID = userID;
}

public Book getBookID() {
	return bookID;
}

public void setBookID(Book bookID) {
	this.bookID = bookID;
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


