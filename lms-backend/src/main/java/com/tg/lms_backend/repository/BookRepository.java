package com.tg.lms_backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tg.lms_backend.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer>{
	Page<Book> findByBookTitleContainingIgnoreCase(String query, Pageable pageable);
	Page<Book> findByAuthorContainingIgnoreCase(String query, Pageable pageable);
	Page<Book> findByCategoryContainingIgnoreCase(String query, Pageable pageable);
	Page<Book> findByPublisherContainingIgnoreCase(String query, Pageable pageable);	
	Page<Book> findByGenreContainingIgnoreCase(String query, Pageable pageable);
	Page<Book> findByCallNumberContainingIgnoreCase(String query, Pageable pageable);
	Page<Book>findByBookId(int bookId, Pageable pageable);
	Page<Book> findByLoanedTo_UserId(int userId, Pageable pageable);
	
}