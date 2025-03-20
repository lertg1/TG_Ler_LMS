package com.tg.lms_backend.service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.core.support.TransactionalRepositoryFactoryBeanSupport;
import org.springframework.stereotype.Service;

import com.tg.lms_backend.BookNotAvailableException;
import com.tg.lms_backend.BookNotFoundException;
import com.tg.lms_backend.ResourceNotFoundException;
import com.tg.lms_backend.model.Book;
import com.tg.lms_backend.model.Transaction;
import com.tg.lms_backend.model.User;
import com.tg.lms_backend.repository.BookRepository;
import com.tg.lms_backend.repository.TransactionRepository;
import com.tg.lms_backend.repository.UserRepository;

import jakarta.transaction.Transactional;


@Service
public class BookService {
	
	@Autowired
	private BookRepository bookRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}
	
	public Book getBookById(int id) {
		return bookRepository.findById(id).orElseThrow(()-> new BookNotFoundException("Book not found"));
	}
	
	public Book saveBook(Book book) {
		return bookRepository.save(book);
	}
	
	public Book updateBook(int id, Book bookDetails) {
		Book book = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not found with id "+id));
		if(bookDetails.getBookTitle() !=null) {
			book.setBookTitle(bookDetails.getBookTitle());
		}
		if(bookDetails.getAuthor() !=null) {
			book.setAuthor(bookDetails.getAuthor());
		}
		if(bookDetails.getIsbn() !=null) {
			book.setIsbn(bookDetails.getIsbn());
		}
		if(bookDetails.getCategory() !=null) {
			book.setCategory(bookDetails.getCategory());
		}
		if(bookDetails.getBookCoverUrl() !=null) {
			book.setBookCoverUrl(bookDetails.getBookCoverUrl());
		}
		if(bookDetails.getCallNumber() !=null) {
			book.setCallNumber(bookDetails.getCallNumber());
		}
		if(bookDetails.getDueDate() !=null) {
			book.setDueDate(bookDetails.getDueDate());
		}
		if(bookDetails.getGenre() !=null) {
			book.setGenre(bookDetails.getGenre());
		}
		if(bookDetails.getLoaned() !=null) {
			book.setLoaned(bookDetails.getLoaned());
		}
		if(bookDetails.getPublisher() !=null) {
			book.setPublisher(bookDetails.getPublisher());
		}
			return bookRepository.save(book);
	}

	public Book borrowBook(int bookId, int userId) {
		// Retrieve the book by ID
		Book book = bookRepository.findById(bookId)
				.orElseThrow(()-> new BookNotFoundException("Book not found"));
		// Check if the book is already loaned
		if (book.getLoaned()) {
			throw new BookNotAvailableException("Book is not available");			
		}
		// Retrieve the user by ID
		User user = userRepository.findById(userId)
			    .orElseThrow(() -> new RuntimeException("User not found"));
		// Set the book as loaned and assign it to the user
		book.setLoaned(true);
		book.setLoanedTo(user);
		// Calculate the due date
		LocalDate dueDate = book.calculateDueDate(14);
		// Set the due date for the book
		book.setDueDate(dueDate);
//		Book savedBook = bookRepository.save(book);
		return bookRepository.save(book);
		
		// Create a new transaction
//		Transaction transaction = new Transaction();
//		transaction.setBookID(savedBook);
//		transaction.setUserID(user);
//		transaction.setDueDate(java.sql.Date.valueOf(dueDate));
//		transactionRepository.save(transaction);
//
//		return savedBook;
		
	}
	public Book returnBook(int bookId) {
		Book book = bookRepository.findById(bookId).orElseThrow(( )-> new RuntimeException("Book not found"));
		book.setLoaned(false);
		book.setLoanedTo(null);
		book.setDueDate(null);
		return bookRepository.save(book);

	}
	public void deleteBook(int id) {
		bookRepository.deleteById(id);
	}
}
