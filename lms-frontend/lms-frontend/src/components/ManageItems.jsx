
import { useState } from "react"
import BookList from "./BookList"
import { useNavigate } from 'react-router-dom';
import AddBook from "./AddBook";

function ManageItems() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Library Catalog");
    const [books, setBooks] = useState([]);
    const [view, setView] = useState("list");
    const [selectedBook, setSelectedBook] = useState(null);

  const redirectToSignIn = () => {
      navigate('/Login');
}
  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery, "in category:", selectedCategory)
  }

  const handleAddBook = () => {
    // Implement add book functionality
      console.log("Add a new item")
    setView("add")
  }
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
    <div className="content-area">
      <div className="header-container">
        <h1>Manage Items</h1>
        <button className="logout-button" onClick={redirectToSignIn}>Logout</button>
      </div>

      <div className="search-container">
        <div className="dropdown">
          <button className="dropdown-button">{selectedCategory}</button>
          <div className="dropdown-content">
            <a href="#" onClick={() => setSelectedCategory("Book ID")}>
              Book ID
            </a>
            <a href="#" onClick={() => setSelectedCategory("Title")}>
              Title
            </a>
            <a href="#" onClick={() => setSelectedCategory("Author")}>
              Author
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
        <BookList books={books} />
      </div>
    </div>
  )
}

export default ManageItems

