package com.tg.lms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tg.lms_backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

}
