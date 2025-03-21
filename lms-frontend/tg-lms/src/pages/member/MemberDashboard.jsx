"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import BookBrowser from "../../components/BookBrowser"
import BookSearch from "../../components/BookSearch"
import BorrowingHistory from "../../components/BorrowingHistory"
import MemberNavbar from "../../components/MemberNavbar"
import { getBooks, getPopularBooks, searchBooks } from "../../services/bookService"
import { getBorrowHistory } from "../../services/circulationService"
import "../../styles/Member.css"

function MemberDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("browse")
  const [books, setBooks] = useState([])
  const [popularBooks, setPopularBooks] = useState([])
  const [borrowHistory, setBorrowHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 20,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPopular, setFilterPopular] = useState(false)

  useEffect(() => {
    fetchBooks()
    fetchPopularBooks()
    if (user) {
      fetchBorrowHistory()
    }
  }, [user])

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

  const fetchPopularBooks = async () => {
    try {
      const response = await getPopularBooks(10)
      setPopularBooks(response)
    } catch (err) {
      console.error("Failed to fetch popular books:", err)
    }
  }

  const fetchBorrowHistory = async () => {
    try {
      const response = await getBorrowHistory(user.id)
      setBorrowHistory(response.content)
    } catch (err) {
      console.error("Failed to fetch borrowing history:", err)
    }
  }

  const handlePageChange = (newPage) => {
    if (searchQuery) {
      handleSearch(searchQuery, newPage)
    } else {
      fetchBooks(newPage)
    }
  }

  const handleSearch = async (query, page = 0) => {
    setSearchQuery(query)
    setLoading(true)

    try {
      if (!query) {
        // If search is cleared, fetch all books
        fetchBooks(page)
        return
      }

      const response = await searchBooks(query, page, pagination.itemsPerPage)
      setBooks(response.content)
      setPagination({
        currentPage: response.number,
        totalPages: response.totalPages,
        totalItems: response.totalElements,
        itemsPerPage: response.size,
      })
    } catch (err) {
      setError("Search failed. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const togglePopularFilter = () => {
    setFilterPopular(!filterPopular)
    if (!filterPopular) {
      // Show popular books
      setBooks(popularBooks)
      setPagination({
        ...pagination,
        currentPage: 0,
        totalPages: 1,
        totalItems: popularBooks.length,
      })
    } else {
      // Revert to all books
      fetchBooks(0)
    }
  }

  return (
    <div className="member-dashboard">
      <MemberNavbar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={logout} />

      <main className="dashboard-content">
        {activeTab === "browse" && (
          <div className="browse-section">
            <div className="browse-header">
              <h2>Browse Books</h2>
              <div className="browse-controls">
                <BookSearch onSearch={handleSearch} />
                <button className={`filter-button ${filterPopular ? "active" : ""}`} onClick={togglePopularFilter}>
                  {filterPopular ? "Show All Books" : "Show Popular Books"}
                </button>
              </div>
            </div>

            <BookBrowser
              books={books}
              loading={loading}
              error={error}
              pagination={pagination}
              onPageChange={handlePageChange}
              user={user}
            />
          </div>
        )}

        {activeTab === "history" && (
          <div className="history-section">
            <h2>Your Borrowing History</h2>
            <BorrowingHistory borrowHistory={borrowHistory} loading={loading} />
          </div>
        )}
      </main>
    </div>
  )
}

export default MemberDashboard

