package com.tg.lms_backend;

public class BookNotFoundException extends RuntimeException{
public BookNotFoundException(String message) {
	super(message);
}
}
