import React, { useState, useEffect } from "react"
import axios from "axios";
import EditBook from "./EditBook";

function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [view, setView] = useState("list");
   
    useEffect(() => {
        axios.get("http://localhost:8080/api/books")
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const handleEdit = (book) => {
        console.log(`Editting ${book.bookId}`);
        setSelectedBook(book);
        setView("edit");
    };

      // Implement edit functionality
      if (view === "edit") {
        return <EditBook book={selectedBook} onClose={() => {
            setView("list"); setSelectedBook(null)
    }
}/>;
    } else if (view === "add") {
        return <AddBook onClose={() => {
            setView("list"); setSelectedBook(null)
    }
}/>;
};   
    
  
    return (
      <div className="book-list">
        {books.map((book) => (
          <div key={book.bookId} className="book-item">
            <div className="book-info">
              <div className="book-title">{book.bookTitle}</div>
              <div className="book-author">{book.author}</div>
            </div>
            <button className="edit-button" onClick={() => handleEdit(book)}>
              EDIT
            </button>
          </div>
        ))}
      </div>
    )
  }
  
  export default BookList
  
  