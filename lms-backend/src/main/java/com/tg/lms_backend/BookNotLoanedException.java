package com.tg.lms_backend;

public class BookNotLoanedException extends RuntimeException{
	public BookNotLoanedException(String message) {
super(message);
}
}
