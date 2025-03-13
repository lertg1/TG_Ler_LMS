package com.tg.lms_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
	
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@RequestBody UserDto userDto) {
		//TODO: process POST request
		return ResponseEntity.ok(userService.registerUser(userDto));
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> authenticateUser(@RequestBody LoginDto loginDto) {
		return ResponseEntity.ok(userService.authenticateUser(loginDto.getEmail(), loginDto.getPassword()));
	}
	

}
