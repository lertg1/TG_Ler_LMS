"use client"

import "../styles/Tables.css"

function UserTable({ users, loading, pagination, onPageChange, onEdit, onDelete }) {
  if (loading) {
    return <div className="loading">Loading users...</div>
  }

  if (!users || users.length === 0) {
    return <div className="no-data">No users found.</div>
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.phoneNumber || "N/A"}</td>
              <td>{user.role}</td>
              <td>
                <span className={`status ${user.active ? "active" : "inactive"}`}>
                  {user.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => onEdit(user)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => onDelete(user.id)}>
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

export default UserTable

