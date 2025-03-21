"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import AdminNavbar from "../../components/AdminNavbar"
import CirculationForm from "../../components/CirculationForm"
import CirculationTable from "../../components/CirculationTable"
import { getBorrowHistory, borrowBook, returnBook, getOverdueBooks } from "../../services/circulationService"
import "../../styles/Admin.css"

function CirculationManagement() {
  const { user, logout } = useAuth()
  const [borrows, setBorrows] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 20,
  })
  const [filter, setFilter] = useState("all") // all, overdue

  useEffect(() => {
    fetchCirculationData()
  }, [filter])

  const fetchCirculationData = async (page = 0) => {
    setLoading(true)
    try {
      let response
      if (filter === "overdue") {
        response = await getOverdueBooks(page, pagination.itemsPerPage)
      } else {
        response = await getBorrowHistory(null, page, pagination.itemsPerPage)
      }

      setBorrows(response.content)
      setPagination({
        currentPage: response.number,
        totalPages: response.totalPages,
        totalItems: response.totalElements,
        itemsPerPage: response.size,
      })
      setError("")
    } catch (err) {
      setError("Failed to fetch circulation data. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    fetchCirculationData(newPage)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleAddBorrow = () => {
    setIsFormOpen(true)
  }

  const handleReturnBook = async (borrowId) => {
    try {
      await returnBook(borrowId)
      // Refresh circulation data
      fetchCirculationData(pagination.currentPage)
    } catch (err) {
      setError("Failed to process return. Please try again.")
      console.error(err)
    }
  }

  const handleFormSubmit = async (borrowData) => {
    try {
      await borrowBook(borrowData.userId, borrowData.bookId, borrowData.dueDate)

      // Close form and refresh circulation data
      setIsFormOpen(false)
      fetchCirculationData(pagination.currentPage)
    } catch (err) {
      setError("Failed to create borrowing record. Please try again.")
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
      <AdminNavbar activeSection="circulation" user={user} onLogout={logout} />

      <main className="admin-content">
        <header className="admin-header">
          <h1>Circulation Management</h1>
          <button className="add-button" onClick={handleAddBorrow}>
            Issue Book
          </button>
        </header>

        {error && <div className="error-message">{error}</div>}

        <div className="filter-controls">
          <label htmlFor="filter">Filter:</label>
          <select id="filter" value={filter} onChange={handleFilterChange} className="filter-select">
            <option value="all">All Records</option>
            <option value="overdue">Overdue Books</option>
          </select>
        </div>

        <CirculationTable
          borrows={borrows}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onReturn={handleReturnBook}
        />

        {isFormOpen && <CirculationForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />}
      </main>
    </div>
  )
}

export default CirculationManagement

