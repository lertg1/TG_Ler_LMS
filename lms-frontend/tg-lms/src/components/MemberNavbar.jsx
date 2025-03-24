import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/MemberNavbar.css"

function MemberNavbar({ activeTab, setActiveTab, user, onLogout }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setShowMobileMenu(false)
  }

  const handleLogout = () => {
    onLogout()
  }

  return (
    <nav className="member-navbar">
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
            <button className={activeTab === "browse" ? "active" : ""} onClick={() => handleTabClick("browse")}>
              Browse Books
            </button>
          </li>
          <li>
            <button className={activeTab === "history" ? "active" : ""} onClick={() => handleTabClick("history")}>
              Borrowing History
            </button>
          </li>
        </ul>

        <div className={`navbar-user ${showMobileMenu ? "active" : ""}`}>
          <div className="user-info">
            <span className="user-name">
              {user?.userName}
            </span>
            <span className="user-role">{user?.userRole}</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default MemberNavbar

