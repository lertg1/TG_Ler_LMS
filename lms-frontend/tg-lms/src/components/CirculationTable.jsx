"use client"

import "../styles/Tables.css"

function CirculationTable({ borrows, loading, pagination, onPageChange, onReturn }) {
  if (loading) {
    return <div className="loading">Loading circulation data...</div>
  }

  if (!borrows || borrows.length === 0) {
    return <div className="no-data">No borrowing records found.</div>
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

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button onClick={() => onPageChange(0)} disabled={pagination.currentPage === 0} className="pagination-button">
          First
        </button>
        <button
          onClick={() => onPageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 0}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {pagination.currentPage + 1} of {pagination.totalPages}
        </span>
        <button
          onClick={() => onPageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages - 1}
          className="pagination-button"
        >
          Next
        </button>
        <button
          onClick={() => onPageChange(pagination.totalPages - 1)}
          disabled={pagination.currentPage === pagination.totalPages - 1}
          className="pagination-button"
        >
          Last
        </button>
      </div>
    )
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Book Title</th>
            <th>User</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Return Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((borrow) => (
            <tr key={borrow.id} className={isOverdue(borrow.dueDate, borrow.returnDate) ? "overdue" : ""}>
              <td>{borrow.book.title}</td>
              <td>
                {borrow.user.firstName} {borrow.user.lastName}
              </td>
              <td>{formatDate(borrow.borrowDate)}</td>
              <td>{formatDate(borrow.dueDate)}</td>
              <td>
                {borrow.returnDate ? (
                  <span className="returned">Returned on {formatDate(borrow.returnDate)}</span>
                ) : isOverdue(borrow.dueDate, borrow.returnDate) ? (
                  <span className="overdue-label">Overdue</span>
                ) : (
                  <span className="borrowed">Borrowed</span>
                )}
              </td>
              <td>
                {!borrow.returnDate && (
                  <button className="return-button" onClick={() => onReturn(borrow.id)}>
                    Return Book
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pagination.totalPages > 1 && renderPagination()}
    </div>
  )
}

export default CirculationTable

