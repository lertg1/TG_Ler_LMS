import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

function MemberPage() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Member Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="user-welcome">
        <h2>Welcome, {currentUser?.userName || "Member"}</h2>
        <p>You are logged in as a member</p>
      </div>

      <div className="content-section">
        <h3>Member Features</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <h4>My Profile</h4>
            <p>View and edit your profile information</p>
          </div>
          <div className="feature-card">
            <h4>My Activities</h4>
            <p>Track your recent activities</p>
          </div>
          <div className="feature-card">
            <h4>Resources</h4>
            <p>Access member-only resources</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberPage

