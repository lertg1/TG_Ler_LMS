package com.tg.lms_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tg.lms_backend.model.LoginRequest;
import com.tg.lms_backend.model.User;
import com.tg.lms_backend.service.UserService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="/localhost:5173")
public class AuthController {
	@Autowired
	private UserService userService;
	
	
	@Autowired 
	private PasswordEncoder passwordEncoder;
	
	
//	 Register a new user	
	@PostMapping("/register")
	public ResponseEntity<String>registerUser(@RequestBody User user){
		try {
			userService.registerUser(user, passwordEncoder);
		} catch(IllegalArgumentException ex) {
			return ResponseEntity.status(HttpStatus.IM_USED).body(ex.getMessage());
			
		}	
		return ResponseEntity.ok("user registered successfully");
	}

	@GetMapping("/current-user")
	public ResponseEntity<User> getCurrentUser(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String currentUserName = authentication.getName();
		User currentUser = userService.getUserByEmail(currentUserName);
		return ResponseEntity.ok(currentUser);
	}
	

	@PostMapping("/login")
	public ResponseEntity<String> authenticateUser(@RequestBody LoginRequest loginRequest) {
		try {
			userService.authenticateUser(loginRequest.getUserEmail(), loginRequest.getUserPassword(), passwordEncoder);
		} catch (UsernameNotFoundException | BadCredentialsException ex) {
			// TODO Auto-generated catch block
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
		}
		return ResponseEntity.ok("User authenticated successfully");
	}

}
