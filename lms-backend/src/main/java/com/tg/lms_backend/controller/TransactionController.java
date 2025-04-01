package com.tg.lms_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tg.lms_backend.model.Transaction;
import com.tg.lms_backend.service.TransactionService;


@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins="/localhost:3000")
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;
	
	// Get transactions by userId by on loaned
	@GetMapping("/user/{userId}/current-loans")
    public ResponseEntity<List<Transaction>> getCurrentLoansByUserId(@PathVariable Integer userId) {
        try {
            List<Transaction> currentLoans = transactionService.getCurrentLoansByUserId(userId);
            return ResponseEntity.ok(currentLoans);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }	
	// Add a new Transaction
	@PostMapping
	public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction){
		Transaction savedTransaction = transactionService.saveTransaction(transaction);
		return ResponseEntity.ok(savedTransaction);		
	}
	
	// Get all Transactions
	@GetMapping
	public ResponseEntity<List<Transaction>> getAllTransactions(){
		List<Transaction> transactions = transactionService.getAllTransactions();
		return ResponseEntity.ok(transactions);
	}
	
	// Get a Transaction by ID
	@GetMapping("/{id}")
	public ResponseEntity<Transaction> getTransactionById(@PathVariable int id){
		Transaction transaction = transactionService.getTransactionById(id);
		return ResponseEntity.ok(transaction);
	}
	
	// Update a Transaction
	@PutMapping("/{id}")
	public ResponseEntity<Transaction>updateTransaction(@PathVariable int id, @RequestBody Transaction transactionDetails){
		Transaction updatedTransaction = transactionService.updateTransaction(id, transactionDetails);
		return ResponseEntity.ok(updatedTransaction);
	}
	
	// Delete a Transaction
	@DeleteMapping("/{id}")
	public ResponseEntity<Transaction> deleteBook(@PathVariable int id){
		transactionService.deleteTransaction(id);
		return ResponseEntity.noContent().build();
	}
	

}
