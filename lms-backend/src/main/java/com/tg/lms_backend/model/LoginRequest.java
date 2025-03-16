package com.tg.lms_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_users")
public class LoginRequest {
@Id
	private int userId;
	private String userEmail;
	private String userPassword;
	
	// Constructor
	
	public LoginRequest() {
		
	}
	public LoginRequest(int userId, String userEmail, String userPassword) {
		super();
		this.userId = userId;
		this.userEmail = userEmail;
		this.userPassword = userPassword;
	}
	
	// Getters and Setters
	
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	
	
	
}
