import { useState, useEffect, useCallback} from "react";
import BookList from "./BookList";
import { useNavigate } from 'react-router-dom';
import AddBook from "./AddBook";
import axios from "axios";
import { Button } from "@mui/material";
import { Input } from "@mui/material";
import "./AdminDashboard.css";


function ManageItems() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Library Catalog");
    const [books, setBooks] = useState([]);
    const [view, setView] = useState("list");
  const [selectedBook, setSelectedBook] = useState(null);
  // Removed unused filteredBooks state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const booksPerPage = 10; // Number of books to display per page

  const redirectToSignIn = () => {
      navigate('/Login');
  }


  
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId = null;
      return (query, category, page = 1) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          fetchBooks(query, category, page);
        }, 300); // 300ms delay
      };
    })(),
    []
  );

  // Effect to fetch books when component mounts
  useEffect(() => {
    fetchBooks("", "Library Catalog", 1);
  }, []);

  // Effect to handle search query changes
  useEffect(() => {
    debouncedSearch(searchQuery, selectedCategory, currentPage);
  }, [searchQuery, selectedCategory, currentPage, debouncedSearch]);

  const fetchBooks = (query, category, page) => {
    setLoading(true);
    setError(null);

    // Build query parameters
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", booksPerPage);
  

    if (query) {
      params.append("query", query);

      // Map frontend category names to backend field names
      switch (category) {
        case "Book ID":
          params.append("field", "bookId");
          break;
        case "Title":
          params.append("field", "bookTitle");
          break;
        case "Author":
          params.append("field", "author");
          break;
          case "Category":
            params.append("field", "category");
            break;
        case "Library Catalog":
          params.append("field", "all");
          break;
        default:
          params.append("field", "all");
      }
    }
    // Make API call
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/books/search?${params.toString()}`)
      .then((response) => {
        // Handle different API response formats
        const { content, totalElements, totalPages } = response.data || {};
        setBooks(Array.isArray(content) ? content : []);
        setTotalBooks(totalElements || 0);
        setTotalPages(totalPages || 1);
        setCurrentPage(page);

        setLoading(false);

      })
      .catch((error) => {

        setError("Failed to load books. Please try again.");
        setBooks([]); // Set empty array on error
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality here

    // Trigger immediate search on form submit
    fetchBooks(searchQuery, selectedCategory, 1)
  }



  const handleAddBook = () => {
    // Implement add book functionality
    setView("add")
  }
      // Implement edit functionality
      if (view === "edit") {
        return <EditBook book={selectedBook} onClose={() => {
            setView("list"); setSelectedBook(null)
    }
}/>;
    } else if (view === "add") {
        return <AddBook
          onClose={() => {
            setView("list"); setSelectedBook(null)
          }}
          onSave={() => {
            setView("list"); setSelectedBook(null)
          }}
        />;
};   
  return (
    <div className="content-area">
      <div className="header-container">
        <h1>Manage Items</h1>
        <button className="logout-button" onClick={redirectToSignIn}>Logout</button>
      </div>

      <div className="search-container">
        <div className="dropdown">
          <button className="dropdown-button">{selectedCategory}</button>
          <div className="dropdown-content">
            <a href="#" onClick={() => setSelectedCategory("Title")}>
              Title
            </a>
            <a href="#" onClick={() => setSelectedCategory("Book ID")}>
              Book ID
            </a>            
            <a href="#" onClick={() => setSelectedCategory("Author")}>
              Author
            </a>
            <a href="#" onClick={() => setSelectedCategory("Category")}>
              Category
            </a>
          </div>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Start your search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <button className="add-book-button" onClick={handleAddBook}>
          Add Book
        </button>
      </div>

      <div className="books-section">
        <h2>Books</h2>
        <BookList
          books={books}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          totalBooks={totalBooks}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />

      </div>
    </div>
  )
}

export default ManageItems

