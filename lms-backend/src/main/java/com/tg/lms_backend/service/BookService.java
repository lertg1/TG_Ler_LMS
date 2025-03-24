package com.tg.lms_backend.service;
//import java.util.Date;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tg.lms_backend.BookNotAvailableException;
import com.tg.lms_backend.BookNotFoundException;
import com.tg.lms_backend.BookNotLoanedException;
import com.tg.lms_backend.ResourceNotFoundException;
import com.tg.lms_backend.UserNotFoundException;
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
	
	@Autowired
	private TransactionRepository transactionRepository;
	
	
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
	
@Transactional	
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
			    .orElseThrow(() -> new UserNotFoundException("User not found"));
		// Set the book as loaned and assign it to the user
		book.setLoaned(true);
		book.setLoanedTo(user);
		// Calculate the due date
		LocalDate dueDate = book.calculateDueDate(14);
		// Set the due date for the book
		book.setDueDate(dueDate);
		Book savedBook = bookRepository.save(book);
		createTransaction(savedBook, user, java.sql.Date.valueOf(dueDate), null,"Borrow");
		return savedBook;
}

		// Create a new transaction
@Transactional	
public Transaction createTransaction(Book book, User user, Date dueDate, Date returnedDate, String transactionType) {
		Transaction transaction = new Transaction();
		transaction.setBookId(book);
		transaction.setUserId(user);
		transaction.setDueDate(dueDate);
		transaction.setReturnedDate(returnedDate);
		// Use java.util.Date to get the current date and convert it to java.sql.Date
		Date transactionDate = new java.sql.Date(System.currentTimeMillis());
		transaction.setTransactionDate(transactionDate);
		transaction.setTransactionType(transactionType);
		return transactionRepository.save(transaction);		
	}

	public Book returnBook(int bookId) {
		Book book = bookRepository.findById(bookId).orElseThrow(( )-> new RuntimeException("Book not found"));
		// Check if the item is currently loaned
		if (!book.getLoaned()) {
			throw new BookNotLoanedException("Item is currently not on loan");
		}
		User user = book.getLoanedTo();
		book.setLoaned(false);
		book.setLoanedTo(null);
		book.setDueDate(null);
		Date returnedDate = new java.sql.Date(System.currentTimeMillis());
		Book savedBook = bookRepository.save(book);
		createTransaction(savedBook, user, null, returnedDate, "Return");
		return savedBook;

	}
	public void deleteBook(int id) {
		bookRepository.deleteById(id);
	}
}
