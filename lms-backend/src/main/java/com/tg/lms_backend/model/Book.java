package com.tg.lms_backend.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_books")
public class Book {
@Id
	private int bookId;
	private String bookTitle;
	private String author;
	private String isbn;
	private String category;
	private String publisher;
	private String genre;
	private String callNumber;
	private String bookCoverUrl;
	private Boolean loaned;
	private Date dueDate;
	
	@ManyToOne
	private User loanedTo; 
	
	//Constructors
	public Book() {
		
	}
	
	public Book(int bookId, String bookTitle, String author, String isbn, String category, String publisher, String genre, String callNumber, String bookCoverUrl, Boolean loaned, Date dueDate, User loanedTo) {
		this.bookId = bookId;
		this.bookTitle = bookTitle;
		this.author = author;
		this.isbn = isbn;
		this.category = category;
		this.publisher = publisher;
		this.dueDate = dueDate;
		this.genre = genre;
		this.bookCoverUrl = bookCoverUrl;
		this.loaned = loaned;
		this.callNumber = callNumber;
		this.loanedTo=loanedTo;
	}
	
	//Getters and Setters
	public int getBookId() {return bookId;}

	public void setBookId(int bookId) {this.bookId = bookId;}

	public String getBookTitle() {return bookTitle;}

	public void setBookTitle(String bookTitle) {this.bookTitle = bookTitle;}

	public String getAuthor() {return author;}

	public void setAuthor(String author) {this.author = author;}

	public String getIsbn() {return isbn;}

	public void setIsbn(String isbn) {this.isbn = isbn;}

	public String getCategory() {return category;}

	public void setCategory(String category) {this.category = category;}

	public String getPublisher() {return publisher;}

	public void setPublisher(String publisher) {this.publisher = publisher;}

	public String getGenre() {return genre;}

	public void setGenre(String genre) {this.genre = genre;}

	public String getCallNumber() {return callNumber;}

	public void setCallNumber(String callNumber) {this.callNumber = callNumber;}

	public String getBookCoverUrl() {return bookCoverUrl;}

	public void setBookCoverUrl(String bookCoverUrl) {this.bookCoverUrl = bookCoverUrl;}

	public Boolean getLoaned() {return loaned;}

	public void setLoaned(Boolean loaned) {this.loaned = loaned;}

	public Date getDueDate() {return dueDate;}

	public void setDueDate(Date dueDate) {this.dueDate = dueDate;}

	public User getLoanedTo() {return loanedTo;}

	public void setLoanedTo(User loanedTo) {this.loanedTo = loanedTo;}
	

}
