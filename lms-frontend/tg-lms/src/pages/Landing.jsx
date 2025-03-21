"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "../styles/Landing.css"

function Landing() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="landing-container">
      <header className="landing-header">
        <nav className="landing-nav">
          <div className="logo">
            <h1>Library MS</h1>
          </div>
          <div className="nav-links">
            {!user ? (
              <>
                <button className="login-btn" onClick={() => navigate("/login")}>
                  Login
                </button>
                <button className="register-btn" onClick={() => navigate("/register")}>
                  Register
                </button>
              </>
            ) : (
              <button className="dashboard-btn" onClick={() => navigate(user.role === "STAFF" ? "/admin" : "/member")}>
                Dashboard
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to our Library Management System</h1>
            <p>Your one-stop solution for all library needs</p>
            <button
              className="cta-button"
              onClick={() => navigate(user ? (user.role === "STAFF" ? "/admin" : "/member") : "/login")}
            >
              {user ? "Go to Dashboard" : "Get Started"}
            </button>
          </div>
          <div className="hero-image">
            <img src="/placeholder.svg?height=400&width=600" alt="Library" />
          </div>
        </section>

        <section className="features-section">
          <h2>Our Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Book Management</h3>
              <p>Browse, search, and manage books with ease</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Advanced Search</h3>
              <p>Find books by title, author, genre, and more</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Borrowing History</h3>
              <p>Track your reading history and current borrows</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👤</div>
              <h3>User Management</h3>
              <p>Easy user registration and profile management</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Library Management System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Landing

