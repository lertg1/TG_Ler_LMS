//package com.tg.lms_backend.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.mail.javamail.JavaMailSender;
//import com.tg.lms_backend.service.UserService;
//@RestController
//@RequestMapping("/api/auth")
//
//public class ForgotPasswordController {
//	@Autowired
//	private JavaMailSender mailSender;
//	
//	@Autowired
//	private UserService userService;
//	
//	
//	
//	@PostMapping("/forgot-password")
//	public ResponseEntity<String> processForgotPassword(@RequestBody String email){
//		// Generate token and send email
//		String token = userService.createPasswordResetToken(email);
//		userService.sendPasswordResetEmail(email, token);
//		return ResponseEntity.ok("Password reset email sent");
//	}
//	
//	@PostMapping("/reset-password")
//	public ResponseEntity<String> processResetPassword(@RequestBody ResetPasswordRequest request){
//		boolean result = userService.resetPassword(request.getToken(), request.getNewPassword());
//		if (result) {
//			return ResponseEntity.ok("Password reset successfully");
//		}else {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
//		}
//	}
//
//}
