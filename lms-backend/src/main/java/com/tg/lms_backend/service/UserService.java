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
		if(userDetails.getUserName() != null) {
			user.setUserName(userDetails.getUserName());
		}
		if(userDetails.getUserPassword() !=null) {
			user.setUserPassword(userDetails.getUserPassword());
		}
		if(userDetails.getUserEmail() !=null) {
			user.setUserEmail(userDetails.getUserEmail());
		}
		if(userDetails.getUserStatus() !=null) {
			user.setUserStatus(userDetails.getUserStatus());
		}
			return userRepository.save(user);
		
	}

	public void deleteUser(int id) {
		// TODO Auto-generated method stub
		userRepository.deleteById(id);;
		
	}

}
