"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import AdminNavbar from "../../components/AdminNavbar"
import UserForm from "../../components/UserForm"
import UserTable from "../../components/UserTable"
import { getUsers, createUser, updateUser, deleteUser, searchUsers } from "../../services/userService"
import "../../styles/Admin.css"

function UserManagement() {
  const { user, logout } = useAuth()
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
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
    fetchUsers()
  }, [])

  const fetchUsers = async (page = 0) => {
    setLoading(true)
    try {
      const response = await getUsers(page, pagination.itemsPerPage)
      setUsers(response.content)
      setPagination({
        currentPage: response.number,
        totalPages: response.totalPages,
        totalItems: response.totalElements,
        itemsPerPage: response.size,
      })
      setError("")
    } catch (err) {
      setError("Failed to fetch users. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    if (searchTerm) {
      handleSearch(searchTerm, newPage)
    } else {
      fetchUsers(newPage)
    }
  }

  const handleSearch = async (query, page = 0) => {
    setSearchTerm(query)
    if (!query) {
      fetchUsers(page)
      return
    }

    setLoading(true)
    try {
      const response = await searchUsers(query, page, pagination.itemsPerPage)
      setUsers(response.content)
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

  const handleSearchInputChange = (e) => {
    const query = e.target.value
    setSearchTerm(query)
    if (!query) {
      fetchUsers(0)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    handleSearch(searchTerm)
  }

  const handleAddUser = () => {
    setCurrentUser(null)
    setFormMode("add")
    setIsFormOpen(true)
  }

  const handleEditUser = (userData) => {
    setCurrentUser(userData)
    setFormMode("edit")
    setIsFormOpen(true)
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId)
        // Refresh user list
        fetchUsers(pagination.currentPage)
      } catch (err) {
        setError("Failed to delete user. Please try again.")
        console.error(err)
      }
    }
  }

  const handleFormSubmit = async (userData) => {
    try {
      if (formMode === "add") {
        await createUser(userData)
      } else {
        await updateUser(currentUser.id, userData)
      }

      // Close form and refresh user list
      setIsFormOpen(false)
      fetchUsers(pagination.currentPage)
    } catch (err) {
      setError(`Failed to ${formMode} user. Please try again.`)
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
      <AdminNavbar activeSection="users" user={user} onLogout={logout} />

      <main className="admin-content">
        <header className="admin-header">
          <h1>User Management</h1>
          <button className="add-button" onClick={handleAddUser}>
            Add New User
          </button>
        </header>

        {error && <div className="error-message">{error}</div>}

        <form className="search-box" onSubmit={handleSearchSubmit}>
          <input type="text" placeholder="Search users..." value={searchTerm} onChange={handleSearchInputChange} />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <UserTable
          users={users}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />

        {isFormOpen && (
          <UserForm mode={formMode} initialData={currentUser} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
        )}
      </main>
    </div>
  )
}

export default UserManagement

