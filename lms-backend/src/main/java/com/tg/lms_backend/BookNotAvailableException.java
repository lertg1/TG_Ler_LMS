package com.tg.lms_backend;

public class BookNotAvailableException extends RuntimeException {
	public BookNotAvailableException(String message) {
		super(message);
	}

}
