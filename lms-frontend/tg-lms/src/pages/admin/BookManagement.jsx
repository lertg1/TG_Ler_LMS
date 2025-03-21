"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import AdminNavbar from "../../components/AdminNavbar"
import BookForm from "../../components/BookForm"
import BookTable from "../../components/BookTable"
import { getBooks, createBook, updateBook, deleteBook } from "../../services/bookService"
import "../../styles/Admin.css"

function BookManagement() {
  const { user, logout } = useAuth()
  const [books, setBooks] = useState([])
  const [currentBook, setCurrentBook] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formMode, setFormMode] = useState("add") // 'add' or 'edit'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 20,
  })
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async (page = 0) => {
    setLoading(true)
    try {
      const response = await getBooks(page, pagination.itemsPerPage)
      setBooks(response.content)
      setPagination({
        currentPage: response.number,
        totalPages: response.totalPages,
        totalItems: response.totalElements,
        itemsPerPage: response.size,
      })
      setError("")
    } catch (err) {
      setError("Failed to fetch books. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    fetchBooks(newPage)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    // Filter books based on search term
    if (e.target.value) {
      const term = e.target.value.toLowerCase()
      // This is a client-side filter, in a real app you'd call an API endpoint
      const filteredBooks = books.filter(
        (book) =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term) ||
          book.isbn.toLowerCase().includes(term),
      )
      setBooks(filteredBooks)
    } else {
      // If search is cleared, fetch all books
      fetchBooks(0)
    }
  }

  const handleAddBook = () => {
    setCurrentBook(null)
    setFormMode("add")
    setIsFormOpen(true)
  }

  const handleEditBook = (book) => {
    setCurrentBook(book)
    setFormMode("edit")
    setIsFormOpen(true)
  }

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(bookId)
        // Refresh book list
        fetchBooks(pagination.currentPage)
      } catch (err) {
        setError("Failed to delete book. Please try again.")
        console.error(err)
      }
    }
  }

  const handleFormSubmit = async (bookData) => {
    try {
      if (formMode === "add") {
        await createBook(bookData)
      } else {
        await updateBook(currentBook.id, bookData)
      }

      // Close form and refresh book list
      setIsFormOpen(false)
      fetchBooks(pagination.currentPage)
    } catch (err) {
      setError(`Failed to ${formMode} book. Please try again.`)
      console.error(err)
    }
  }

  const handleFormCancel = () => {
    setIsFormOpen(false)
  }

  if (!user || user.role !== "STAFF") {
    return (
      <div className="access-denied">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <AdminNavbar activeSection="books" user={user} onLogout={logout} />

      <main className="admin-content">
        <header className="admin-header">
          <h1>Book Management</h1>
          <button className="add-button" onClick={handleAddBook}>
            Add New Book
          </button>
        </header>

        {error && <div className="error-message">{error}</div>}

        <div className="search-box">
          <input type="text" placeholder="Search books..." value={searchTerm} onChange={handleSearch} />
        </div>

        <BookTable
          books={books}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
        />

        {isFormOpen && (
          <BookForm mode={formMode} initialData={currentBook} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
        )}
      </main>
    </div>
  )
}

export default BookManagement

