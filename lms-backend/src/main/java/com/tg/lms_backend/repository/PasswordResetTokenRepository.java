package com.tg.lms_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tg.lms_backend.model.User;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<User, Integer> {
Optional<User> findByUserEmail(String email);
boolean existsByUserEmail(String userEmail);
}