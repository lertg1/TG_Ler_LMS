package com.tg.lms_backend;
import com.tg.lms_backend.model.Book;
import com.tg.lms_backend.repository.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
	
	@Autowired
	private BookRepository bookRepository;
	
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}
	
	public Book getBookById(int id) {
		return bookRepository.findById(id).orElse(null);
	}
	
	public Book saveBook(Book book) {
		return bookRepository.save(book);
	}
	
	public Book updateBook(int id, Book bookDetails) {
		Book book = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not found with id "+id));
		if (book !=null) {
			book.setBookTitle(bookDetails.getBookTitle());
			book.setAuthor(bookDetails.getAuthor());
			book.setIsbn(bookDetails.getIsbn());
			book.setCategory(bookDetails.getCategory());
			book.setBookCoverUrl(bookDetails.getBookCoverUrl());
			book.setCallNumber(bookDetails.getCallNumber());
			book.setDueDate(bookDetails.getDueDate());
			book.setGenre(bookDetails.getGenre());
			book.setLoaned(bookDetails.getLoaned());
			book.setPublisher(bookDetails.getPublisher());
			return bookRepository.save(book);
		}
		return null;
	}
	
	public void deleteBook(int id) {
		bookRepository.deleteById(id);
	}
}
