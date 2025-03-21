import "../styles/Tables.css"

function BookTable({ books, loading, pagination, onPageChange, onEdit, onDelete }) {
  if (loading) {
    return <div className="loading">Loading books...</div>
  }

  if (!books || books.length === 0) {
    return <div className="no-data">No books found.</div>
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
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Publication Year</th>
            <th>Genre</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.publicationYear}</td>
              <td>{book.genre || "N/A"}</td>
              <td>
                <span className={`status ${book.available ? "available" : "unavailable"}`}>
                  {book.available ? "Available" : "Unavailable"}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => onEdit(book)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => onDelete(book.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pagination.totalPages > 1 && renderPagination()}
    </div>
  )
}

export default BookTable

