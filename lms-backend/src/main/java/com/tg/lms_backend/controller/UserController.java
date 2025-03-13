package com.tg.lms_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tg.lms_backend.model.User;
import com.tg.lms_backend.repository.UserRepository;
import com.tg.lms_backend.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins="/localhost:5173")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	// Add a new user
	@PostMapping
	public ResponseEntity<User> addUser(@RequestBody User user){
		User savedUser = userService.saveUser(user);
		return ResponseEntity.ok(savedUser);		
	}
	
	// Get all users
	@GetMapping
	public ResponseEntity<List<User>> getAllUsers(){
		List<User> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}
	
	// Get a user by ID
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable int id){
		User user = userService.getUserById(id);
		return ResponseEntity.ok(user);
	}
	
	// Update a user
	@PutMapping("/{id}")
	public ResponseEntity<User>updateUser(@PathVariable int id, @RequestBody User userDetails){
		User updatedUser = userService.updateUser(id, userDetails);
		return ResponseEntity.ok(updatedUser);
	}
	
	// Delete a user
	@DeleteMapping("/{id}")
	public ResponseEntity<User> deleteBook(@PathVariable int id){
		userService.deleteUser(id);
		return ResponseEntity.noContent().build();
	}
	
	// User sign up
	@PostMapping("/signup")
	public ResponseEntity<User> registerUser(@RequestBody SignUpDto signUpDto){
		if(UserRepository.existsByUsername(signUpDto.getUsername())) {
			return new ResponseEntity<>("Username is already taken", HttpStatus.BAD_REQUEST);
		}
		if(UserRepository.existsByEmain(signUpDto.getEmail())) {
			return new ResponseEntity<>("Email is already take",HttpStatus.BAD_REQUEST);
		}
		User user = new User();
		user.setUserName(signUpDto.getUsername());
		user.setUserEmail(signUpDto.getEmail());
		user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
		user.setUserStatus("Active");
		UserRepository.save(user);
	}

}
