package com.tg.lms_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tg.lms_backend.model.Transaction;
import com.tg.lms_backend.model.User;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer>{
}