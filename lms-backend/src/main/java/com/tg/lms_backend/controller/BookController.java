package com.tg.lms_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tg.lms_backend.model.Book;
import com.tg.lms_backend.service.BookService;


@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins="/localhost:3000/")
public class BookController {

	@Autowired
	private BookService bookService;
	
	// Add a new book
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book savedBook = bookService.saveBook(book);
        return ResponseEntity.ok(savedBook);
    }

    // Get all books
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllBooks(
    		@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int limit
			) {
try {
	Page<Book> pageBooks = bookService.findPaginated(page-1, limit);
	Map<String, Object> response = new HashMap<>();
	response.put("data", pageBooks.getContent());
	response.put("total", pageBooks.getTotalElements());
	return ResponseEntity.ok(response);
}catch (Exception e) {
	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
}
	}
//    @GetMapping
//    public ResponseEntity<List<Book>> getAllBooks() {
//        List<Book> books = bookService.getAllBooks();
//        return ResponseEntity.ok(books);
//    }

    // Get a book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable int id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }
    
    @GetMapping ("/search")
    public Page<Book> getBooks(
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "all") String field,
            @RequestParam(required = false, defaultValue = "1") int page,
            @RequestParam(required = false, defaultValue = "10") int limit) {
        return bookService.getBooks(query, field, page, limit);
    }

    // Update a book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable int id, @RequestBody Book bookDetails) {
        Book updatedBook = bookService.updateBook(id, bookDetails);
        return ResponseEntity.ok(updatedBook);
    }

    // Delete a book
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable int id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
    
    //Borrow a book
    @PostMapping("/{bookId}/borrow/{userId}")
    public ResponseEntity<Book> borrowBook(@PathVariable int bookId, @PathVariable int userId){
    	Book borrowedBook=bookService.borrowBook(bookId,  userId);
    	return ResponseEntity.ok(borrowedBook);
    }	
    //Return a book
    @PostMapping("/{bookId}/return")
    public ResponseEntity<Book> returnBook(@PathVariable int bookId) {
    	Book returnedBook = bookService.returnBook(bookId);
    	return ResponseEntity.ok(returnedBook);
    }
    	
    	
    }
    
	
