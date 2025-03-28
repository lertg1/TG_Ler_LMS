package com.tg.lms_backend.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tbl_users")
public class User {
	
	@Id
	private int userId;
	private String userName;
	private String userEmail;
	private String userPassword;
	private String userStatus;
	private String userRole;
	private String userDepartment;
	private Date createdAt;
	private Date updatedAt;
	private Number userFine;
	private String resetPasswordToken;
	
	// Constructor
	public User() {
		
	};
	
	public User(int userId, String userName, String userEmail, String userPassword, String userStatus, String userRole, String userDepartment, Date createdAt,
			Date updatedAt, Number userFine, String resetPasswordToken) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userEmail = userEmail;
		this.userPassword = userPassword;
		this.userStatus = userStatus;
		this.userRole = userRole;
		this.userDepartment = userDepartment;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.userFine=userFine;
		this.resetPasswordToken=resetPasswordToken;
	}
	
//Getters and Setters
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
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

	public String getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public String getUserRole() {
		return userRole;
	}

	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	public String getUserDepartment() {
		return userDepartment;
	}

	public void setUserDepartment(String userDepartment) {
		this.userDepartment = userDepartment;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Number getUserFine() {
		return userFine;
	}

	public void setUserFine(Number userFine) {
		this.userFine = userFine;
	}

	public String getResetPasswordToken() {
		return resetPasswordToken;
	}

	public void setResetPasswordToken(String resetPasswordToken) {
		this.resetPasswordToken = resetPasswordToken;
	}
	

	
	

}
