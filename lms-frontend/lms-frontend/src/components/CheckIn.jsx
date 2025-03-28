import { useState } from "react"

function CheckIn() {
  const [bookId, setBookId] = useState("")

  // Sample checked out books data
  const checkedOutBooks = [
    { id: 1, title: "Book Title", author: "Author", dueDate: "15/05/2025" },
    { id: 2, title: "Book Title", author: "Author", dueDate: "15/05/2025" },
    { id: 3, title: "Book Title", author: "Author", dueDate: "15/05/2025" },
    { id: 4, title: "Book Title", author: "Author", dueDate: "15/05/2025" },
    { id: 5, title: "Book Title", author: "Author", dueDate: "15/05/2025" },
  ]

  const handleCheckIn = (e) => {
    e.preventDefault()
    // Implement check in functionality
    console.log("Checking in book:", bookId)
    // Reset form
    setBookId("")
  }

  return (
    <div className="content-area">
      <div className="header-container">
        <h1>Check out</h1>
        <button className="logout-button">Logout</button>
      </div>

      <form onSubmit={handleCheckIn} className="checkin-form">
        <div className="form-group">
          <label htmlFor="bookId">Book ID</label>
          <input
            type="text"
            id="bookId"
            placeholder="Enter / Scan Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" className="checkin-button">
            Check In
          </button>
        </div>
      </form>

      <div className="books-table-container">
        <table className="books-table">
          <thead>
            <tr>
              <th>Books</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {checkedOutBooks.map((book) => (
              <tr key={book.id}>
                <td>
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.author}</div>
                </td>
                <td>{book.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CheckIn

