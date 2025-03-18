package com.tg.lms_backend.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tg.lms_backend.model.Transaction;
import com.tg.lms_backend.repository.TransactionRepository;



@Service
public class TransactionService {
	
	@Autowired
	private TransactionRepository transactionRepository;
	
	public List<Transaction> getAllTransactions(){
		return transactionRepository.findAll();
	}
	
	public Transaction getTransactionById(int id) {
		return transactionRepository.findById(id).orElse(null);
	}
	
	public Transaction saveTransaction(Transaction transaction) {
		return transactionRepository.save(transaction);
	}
	
	public Transaction updateTransaction(int id, Transaction transactionDetails) {
		Transaction transaction = transactionRepository.findById(id).orElse(null);
		if(transactionDetails.getTransactionType() !=null) {
			transaction.setTransactionType(transactionDetails.getTransactionType());
		}
		if(transactionDetails.getTransactionDate() !=null) {
			transaction.setTransactionDate(transactionDetails.getTransactionDate());
		}
		if(transactionDetails.getUserID() !=null) {
			transaction.setUserID(transactionDetails.getUserID());
		}
		if(transactionDetails.getBookID() !=null) {
			transaction.setBookID(transactionDetails.getBookID());
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
