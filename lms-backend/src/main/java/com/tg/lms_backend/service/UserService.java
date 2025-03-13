package com.tg.lms_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tg.lms_backend.model.User;
import com.tg.lms_backend.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public User saveUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return null;
	}

	public User getUserById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public User updateUser(int id, User userDetails) {
		// TODO Auto-generated method stub
		return null;
	}

	public void deleteUser(int id) {
		// TODO Auto-generated method stub
		
	}

}
