package com.tg.lms_backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
	
	//Constructors
	public Book() {
		
	}
	
	public Book(int bookId, String bookTitle, String author, String isbn, String category) {
		this.bookId = bookId;
		this.bookTitle = bookTitle;
		this.author = author;
		this.isbn = isbn;
		this.category = category;
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


	

}
