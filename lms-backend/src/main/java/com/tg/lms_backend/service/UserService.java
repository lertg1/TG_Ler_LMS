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
		return userRepository.save(user);
	}

	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}

	public User getUserById(int id) {
		// TODO Auto-generated method stub
		return userRepository.findById(id).orElse(null);
	}

	public User updateUser(int id, User userDetails) {
		// TODO Auto-generated method stub
		User user = userRepository.findById(id).orElse(null);
		if(user!=null) {
			user.setUserName(userDetails.getUserName());
			user.setUserPassword(userDetails.getUserPassword());
			user.setUserEmail(userDetails.getUserEmail());
			user.setUserStatus(userDetails.getUserStatus());
			user.setUpdatedAt(userDetails.getUpdatedAt());		
			return userRepository.save(user);
		}
		return null;
		
	}

	public void deleteUser(int id) {
		// TODO Auto-generated method stub
		userRepository.deleteById(id);;
		
	}

}
