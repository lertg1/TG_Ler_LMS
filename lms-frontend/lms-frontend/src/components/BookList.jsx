import React, { useState} from "react"

import EditBook from "./EditBook";
import "./AdminDashboard.css"
import { Button } from "@mui/material";

function BookList({books, loading, currentPage, totalPages, totalBooks, onPageChange, onEdit}) {

    const [selectedBook, setSelectedBook] = useState(null);
  const [view, setView] = useState("list");
  const [error, _setError] = useState(null);
  // Removed redundant books state declaration

  const handleBookUpdated = () => {
    setView("list");
    setSelectedBook(null);
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }
    const handlePageChange = (newPage) => {
      if (newPage < 1 || newPage > totalPages) return;
      if (onPageChange) {
        onPageChange(newPage)
      } else {
        console.error
      }
    }
  
    const handleEdit = (book) => {

      if (onEdit) {
        onEdit(book);
      } else {
        setSelectedBook(book);
        setView("edit");
      }
      };

      // Implement edit functionality
      if (view === "edit") {
        return <EditBook
          book={selectedBook}
          onSave={handleBookUpdated}
          onClose={() => {
            setView("list"); setSelectedBook(null)
    }
} />;
  };   
  if (!Array.isArray(books)) {
    return <div className="error">Invalid data format: books should be an array</div>

  }
if (loading) {
    return <div className="loading">Loading books...</div>
  }
  if (error) {
    return <div className="error">{error}</div>
  }
  if (books.length === 0) {
    return <div className="no-books">No books found</div>
  }
  return (
      <>
      <div className="book-list">

        {books.map((book) => (
          <div key={book.bookId} className="book-item">
            <div className="book-info">
              <div className="book-title">{book.bookTitle}</div>
              <div className="book-author">{book.author}</div>
              {book.category && <p className="book-category">Category: {book.category}</p>}
            </div>
            <button className="edit-button" onClick={() => handleEdit(book)}>
              EDIT
            </button>
          </div>
        ))}
      </div>
{/* Pagination Controls */}
  <div className="pagination">
         <Button className="Button" variant="contained" size="small" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
           First
         </Button>
         <Button className="Button" variant="contained" size="small" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
           Previous
         </Button>
         <span className="text-sm">
         Page {currentPage} of {totalPages} ({totalBooks} total books)
         </span>
         <Button className="Button" variant="contained" size="small" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
           Next
         </Button>
         <Button className="Button" variant="contained" size="small" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
           Last
       </Button>
   </div>
      </>)
      
  }
  
  export default BookList
  
  