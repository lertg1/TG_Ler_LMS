import "../styles/BorrowingHistory.css"

function BorrowingHistory({ borrowHistory, loading }) {
  if (loading) {
    return <div className="loading">Loading borrowing history...</div>
  }

  if (!borrowHistory || borrowHistory.length === 0) {
    return <div className="no-history">You have no borrowing history.</div>
  }

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Function to determine if a book is overdue
  const isOverdue = (dueDate, returnDate) => {
    if (returnDate) return false

    const today = new Date()
    const due = new Date(dueDate)
    return today > due
  }

  return (
    <div className="borrowing-history">
      <table className="history-table">
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Borrowed Date</th>
            <th>Due Date</th>
            <th>Return Status</th>
          </tr>
        </thead>
        <tbody>
          {borrowHistory.map((borrow) => (
            <tr key={borrow.id} className={isOverdue(borrow.dueDate, borrow.returnDate) ? "overdue" : ""}>
              <td>{borrow.book.title}</td>
              <td>{borrow.book.author}</td>
              <td>{formatDate(borrow.borrowDate)}</td>
              <td>{formatDate(borrow.dueDate)}</td>
              <td>
                {borrow.returnDate ? (
                  <span className="returned">Returned on {formatDate(borrow.returnDate)}</span>
                ) : isOverdue(borrow.dueDate, borrow.returnDate) ? (
                  <span className="overdue-label">Overdue</span>
                ) : (
                  <span className="due">Due {formatDate(borrow.dueDate)}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BorrowingHistory

