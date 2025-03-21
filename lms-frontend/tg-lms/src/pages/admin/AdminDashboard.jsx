"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import AdminNavbar from "../../components/AdminNavbar"
import AdminStats from "../../components/AdminStats"
import "../../styles/Admin.css"

function AdminDashboard() {
  const { user, logout } = useAuth()

  if (!user || user.role !== "STAFF") {
    return (
      <div className="access-denied">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <Link to="/">Return to Home</Link>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <AdminNavbar activeSection="dashboard" user={user} onLogout={logout} />

      <main className="admin-content">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user.firstName}!</p>
        </header>

        <AdminStats />

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-cards">
            <Link to="/admin/books" className="action-card">
              <div className="action-icon">📚</div>
              <h3>Manage Books</h3>
              <p>Add, edit, or remove books from the library</p>
            </Link>

            <Link to="/admin/users" className="action-card">
              <div className="action-icon">👥</div>
              <h3>Manage Users</h3>
              <p>View and manage user accounts</p>
            </Link>

            <Link to="/admin/circulation" className="action-card">
              <div className="action-icon">🔄</div>
              <h3>Circulation</h3>
              <p>Handle book borrowing and returns</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard

