"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/AdminNavbar.css"

function AdminNavbar({ activeSection, user, onLogout }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleLogout = () => {
    onLogout()
  }

  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Library MS</Link>
        </div>

        <div className="navbar-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-links ${showMobileMenu ? "active" : ""}`}>
          <li>
            <Link
              to="/admin"
              className={activeSection === "dashboard" ? "active" : ""}
              onClick={() => setShowMobileMenu(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/books"
              className={activeSection === "books" ? "active" : ""}
              onClick={() => setShowMobileMenu(false)}
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={activeSection === "users" ? "active" : ""}
              onClick={() => setShowMobileMenu(false)}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/circulation"
              className={activeSection === "circulation" ? "active" : ""}
              onClick={() => setShowMobileMenu(false)}
            >
              Circulation
            </Link>
          </li>
        </ul>

        <div className={`navbar-user ${showMobileMenu ? "active" : ""}`}>
          <div className="user-info">
            <span className="user-name">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="user-role">{user?.role}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar

