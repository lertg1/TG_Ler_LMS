
import { useState } from "react"
import BookList from "./BookList"

function ManageItems() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Library Catalog")

  // Sample book data
  const books = [
    { id: 1, title: "Book Title", author: "Author" },
    { id: 2, title: "Book Title", author: "Author" },
    { id: 3, title: "Book Title", author: "Author" },
    { id: 4, title: "Book Title", author: "Author" },
    { id: 5, title: "Book Title", author: "Author" },
    { id: 6, title: "Book Title", author: "Author" },
    { id: 7, title: "Book Title", author: "Author" },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery, "in category:", selectedCategory)
  }

  const handleAddBook = () => {
    // Implement add book functionality
    console.log("Add book clicked")
  }

  return (
    <div className="content-area">
      <div className="header-container">
        <h1>Manage Items</h1>
        <button className="logout-button">Logout</button>
      </div>

      <div className="search-container">
        <div className="dropdown">
          <button className="dropdown-button">{selectedCategory}</button>
          <div className="dropdown-content">
            <a href="#" onClick={() => setSelectedCategory("Library Catalog")}>
              Library Catalog
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

