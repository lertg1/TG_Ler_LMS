"use client"

import { useState, useEffect } from "react"
import { getUsers } from "../services/userService"
import { getBooks } from "../services/bookService"
import "../styles/Forms.css"

function CirculationForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    userId: "",
    bookId: "",
    dueDate: "",
  })
  const [users, setUsers] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Calculate default due date (14 days from today)
  const defaultDueDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 14)
    return date.toISOString().split("T")[0]
  }

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      dueDate: defaultDueDate(),
    }))

    fetchUsersAndBooks()
  }, [])

  const fetchUsersAndBooks = async () => {
    setLoading(true)
    try {
      // Fetch users and books in parallel
      const [usersResponse, booksResponse] = await Promise.all([
        getUsers(0, 100), // Get first 100 users
        getBooks(0, 100), // Get first 100 books
      ])

      setUsers(usersResponse.content)

      // Filter to only show available books
      const availableBooks = booksResponse.content.filter((book) => book.available)
      setBooks(availableBooks)

      setError("")
    } catch (err) {
      setError("Failed to load users or books data. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (loading) {
    return <div className="loading">Loading form data...</div>
  }

  return (
    <div className="form-modal">
      <div className="form-container">
        <h2>Issue Book</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">Select User*</label>
            <select id="userId" name="userId" value={formData.userId} onChange={handleChange} required>
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="bookId">Select Book*</label>
            <select id="bookId" name="bookId" value={formData.bookId} onChange={handleChange} required>
              <option value="">-- Select Book --</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} by {book.author}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date*</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={!formData.userId || !formData.bookId || !formData.dueDate}
            >
              Issue Book
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CirculationForm

