package com.tg.lms_backend.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tg.lms_backend.ResourceNotFoundException;
import com.tg.lms_backend.model.Transaction;
import com.tg.lms_backend.repository.TransactionRepository;



@Service
public class TransactionService {
	
	@Autowired
	private TransactionRepository transactionRepository;
	
	public List<Transaction> getAllTransactions(){
		return transactionRepository.findAll();
	}
	public Transaction addTransaction(Transaction transaction ) {
		return transactionRepository.save(transaction);
	}
	public Transaction getTransactionById(int id) {
		return transactionRepository.findById(id).orElse(null);
	}
	
	public Transaction saveTransaction(Transaction transaction) {
		return transactionRepository.save(transaction);
	}
	
	public Transaction updateTransaction(int id, Transaction transactionDetails) {
		Transaction transaction = transactionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
		if(transactionDetails.getTransactionType() !=null) {
			transaction.setTransactionType(transactionDetails.getTransactionType());
		}
		if(transactionDetails.getTransactionDate() !=null) {
			transaction.setTransactionDate(transactionDetails.getTransactionDate());
		}
		if(transactionDetails.getUserId() !=null) {
			transaction.setUserId(transactionDetails.getUserId());
		}
		if(transactionDetails.getBookId() !=null) {
			transaction.setBookId(transactionDetails.getBookId());
		}
		if(transactionDetails.getDueDate() !=null) {
			transaction.setDueDate(transactionDetails.getDueDate());
		}
		if(transactionDetails.getReturnedDate() !=null) {
			transaction.setReturnedDate(transactionDetails.getReturnedDate());
		}
		
			return transactionRepository.save(transaction);
	}
	
	public void deleteTransaction(int id) {
		transactionRepository.deleteById(id);
	}
}
