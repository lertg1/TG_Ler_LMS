package com.tg.lms_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	public User authenticateUser(@RequestBody User user) {
		return userService.authenticateUser(user.getUserEmail(), user.getUserPassword(), passwordEncoder);

	}

}
