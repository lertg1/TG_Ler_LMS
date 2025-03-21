package com.tg.lms_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.tg.lms_backend.model.User;
import com.tg.lms_backend.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
        
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUserEmail())
                .password(user.getUserPassword())
                .roles("USER")
                .build();
    }
	
	public User registerUser(User user, PasswordEncoder passwordEncoder) {
		if(user.getUserId() !=0 && userRepository.existsById(user.getUserId())) {
			throw new IllegalArgumentException("User ID already exists.");
		}
		if (userRepository.existsByUserEmail(user.getUserEmail())) {
			throw new IllegalArgumentException("User email already exists");
		}
		user.setUserId(0);
 		user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
		user.setUserStatus("Active");
		return userRepository.save(user);
	}
	
	public User authenticateUser(String email, String password, PasswordEncoder passwordEncoder) {
		User user = userRepository.findByUserEmail(email).orElseThrow(()-> new UsernameNotFoundException("User not found with email :"+email));
		if (passwordEncoder.matches(password, user.getUserPassword())) {
			return user;
		} else {
			throw new BadCredentialsException("Invalid credentials");
		}
	}
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
		if(userDetails.getUserRole() !=null) {
			user.setUserRole(userDetails.getUserRole());
		}
		if(userDetails.getUserDepartment() !=null) {
			user.setUserDepartment(userDetails.getUserDepartment());
		}
			return userRepository.save(user);
		
	}

	public void deleteUser(int id) {
		// TODO Auto-generated method stub
		userRepository.deleteById(id);;
		
	}

}
