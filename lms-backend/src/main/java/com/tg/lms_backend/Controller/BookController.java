package com.tg.lms_backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tg.lms_backend.Model.Book;

@RestController
@RequestMapping("/api/books")
public class BookController {

	@Autowired
	private BookService bookService;
	
	@GetMapping
	public List<Book> getAllBooks(){
		return bookService.getAllBooks();
	}
	
	@GetMapping("/{id}")
	public Book getBookById(@PathVariable int id) {
		return bookService.getBookById(id);
	}
	
	@PostMapping
	public Book createBook(@RequestBody Book book ) {
		return bookService.saveBook(book);
	}
	
	@PutMapping("/{id}")
	public Book updateBook(@PathVariable int id, @RequestBody Book bookDetails) {
		Book book = bookService.getBookById(id);
		if (book != null) {
			book.setBookTitle(bookDetails.getBookTitle());
			book.setAuthor(bookDetails.getAuthor());
			book.setIsbn(bookDetails.getIsbn());
			book.setCategory(bookDetails.getCategory());
			return bookService.saveBook(book);
		}
		return null;
	}
	@DeleteMapping("/{id}")
	public void deleteBook(@PathVariable int id) {
		bookService.deleteBook(id);
	}

}
