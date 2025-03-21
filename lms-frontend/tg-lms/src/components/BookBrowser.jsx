"use client"

import { useState } from "react"
import { borrowBook } from "../services/circulationService"
import "../styles/BookBrowser.css"

function BookBrowser({ books, loading, error, pagination, onPageChange, user }) {
  const [selectedBook, setSelectedBook] = useState(null)
  const [borrowStatus, setBorrowStatus] = useState({ success: false, error: "" })

  const handleViewDetails = (book) => {
    setSelectedBook(book)
    setBorrowStatus({ success: false, error: "" })
  }

  const handleCloseDetails = () => {
    setSelectedBook(null)
  }

  const handleBorrow = async (bookId) => {
    try {
      // Calculate due date (14 days from now)
      const dueDate = new Date()
      dueDate.setDate(dueDate.getDate() + 14)

      await borrowBook(user.id, bookId, dueDate.toISOString().split("T")[0])

      setBorrowStatus({
        success: true,
        error: "",
      })
    } catch (err) {
      setBorrowStatus({
        success: false,
        error: err.message || "Failed to borrow book. Please try again.",
      })
    }
  }

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button onClick={() => onPageChange(0)} disabled={pagination.currentPage === 0} className="pagination-button">
          First
        </button>
        <button
          onClick={() => onPageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 0}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {pagination.currentPage + 1} of {pagination.totalPages}
        </span>
        <button
          onClick={() => onPageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages - 1}
          className="pagination-button"
        >
          Next
        </button>
        <button
          onClick={() => onPageChange(pagination.totalPages - 1)}
          disabled={pagination.currentPage === pagination.totalPages - 1}
          className="pagination-button"
        >
          Last
        </button>
      </div>
    )
  }

  if (loading) {
    return <div className="loading">Loading books...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (books.length === 0) {
    return <div className="no-books">No books found.</div>
  }

  return (
    <div className="book-browser">
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card" onClick={() => handleViewDetails(book)}>
            <div className="book-image">
              <img src={book.coverImageUrl || "/placeholder.svg?height=200&width=150"} alt={book.title} />
            </div>
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <p className="book-status">
                {book.available ? (
                  <span className="available">Available</span>
                ) : (
                  <span className="unavailable">Unavailable</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {pagination.totalPages > 1 && renderPagination()}

      {selectedBook && (
        <div className="book-details-modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseDetails}>
              ×
            </button>

            <div className="book-details">
              <div className="book-cover">
                <img
                  src={selectedBook.coverImageUrl || "/placeholder.svg?height=300&width=200"}
                  alt={selectedBook.title}
                />
              </div>

              <div className="book-info-details">
                <h2>{selectedBook.title}</h2>
                <p className="author">by {selectedBook.author}</p>
                <div className="book-metadata">
                  <p>
                    <strong>ISBN:</strong> {selectedBook.isbn}
                  </p>
                  <p>
                    <strong>Published:</strong> {selectedBook.publicationYear}
                  </p>
                  <p>
                    <strong>Genre:</strong> {selectedBook.genre}
                  </p>
                  <p>
                    <strong>Publisher:</strong> {selectedBook.publisher}
                  </p>
                  <p>
                    <strong>Language:</strong> {selectedBook.language}
                  </p>
                  <p>
                    <strong>Pages:</strong> {selectedBook.pageCount}
                  </p>
                </div>

                <div className="book-description">
                  <h3>Description:</h3>
                  <p>{selectedBook.description}</p>
                </div>

                <div className="book-actions">
                  {selectedBook.available ? (
                    <button className="borrow-button" onClick={() => handleBorrow(selectedBook.id)}>
                      Borrow Book
                    </button>
                  ) : (
                    <p className="unavailable-message">This book is currently unavailable</p>
                  )}
                </div>

                {borrowStatus.success && <div className="success-message">Book has been successfully borrowed.</div>}

                {borrowStatus.error && <div className="error-message">{borrowStatus.error}</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookBrowser

