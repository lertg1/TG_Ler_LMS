import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

function AdminPage() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="page-container admin-page">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="user-welcome">
        <h2>Welcome, {currentUser?.userName || "Admin"}</h2>
        <p>You are logged in as staff with admin privileges</p>
      </div>

      <div className="content-section">
        <h3>Administration Tools</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <h4>User Management</h4>
            <p>Manage user accounts and permissions</p>
          </div>
          <div className="feature-card">
            <h4>Content Management</h4>
            <p>Update website content and resources</p>
          </div>
          <div className="feature-card">
            <h4>System Settings</h4>
            <p>Configure system parameters</p>
          </div>
          <div className="feature-card">
            <h4>Analytics</h4>
            <p>View site usage statistics</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage

