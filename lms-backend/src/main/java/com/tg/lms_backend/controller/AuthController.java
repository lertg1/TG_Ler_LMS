package com.tg.lms_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tg.lms_backend.model.LoginRequest;
import com.tg.lms_backend.model.User;
import com.tg.lms_backend.service.UserService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private UserService userService;
	
	@Autowired 
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/register")
	public User registerUser(@RequestBody User user) {
		//TODO: process POST request
		return userService.registerUser(user, passwordEncoder);
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> authenticateUser(@RequestBody LoginRequest loginRequest) {
		try {
			User user =userService.authenticateUser(loginRequest.getUserEmail(), loginRequest.getUserPassword(), passwordEncoder);
//			return userService.authenticateUser(user.getUserEmail(), user.getUserPassword(), passwordEncoder);
		} catch (UsernameNotFoundException | BadCredentialsException ex) {
			// TODO Auto-generated catch block
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
		}
		return ResponseEntity.ok("User authenticated successfully");
	}

}
