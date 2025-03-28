
import { useState, useEffect } from "react"
import axios from "axios";

function CheckOut() {
    const [userId, setUserId] = useState("");
    const [bookId, setBookId] = useState("");
    const [checkOutBooks, setCheckedOutBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const handleCheckOut = async (e) => {
        e.preventDefault()
        const response = await axios.post(`http:localhost:8080/api/books/${bookId}/borrow/${userId}`);
        if (response.ok) {
            console.log(`Successfully checked out ${bookId} to ${userId}`)
        }
    }

  return (
    <div className="content-area">
      <div className="header-container">
        <h1>Check out</h1>
        <button className="logout-button">Logout</button>
      </div>

      <form onSubmit={handleCheckOut} className="checkout-form">
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            placeholder="Enter / Scan User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

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
          <button type="submit" className="checkout-button">
            Check out
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

export default CheckOut

