// Desc: Admin dashboard statistics
import { useState, useEffect } from "react"
import "../styles/AdminStats.css"
import { api } from "../services/api"

function AdminStats() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    activeBorrows: 0,
    overdueBooks: 0,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real application, you would have a dedicated endpoint for stats
        // Here we're simulating the API call
        const response = await api.get("/admin/stats")
        setStats({
          ...response.data,
          loading: false,
          error: null,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
        // Simulate stats for demo purposes
        setStats({
          totalBooks: 243,
          totalUsers: 78,
          activeBorrows: 32,
          overdueBooks: 5,
          loading: false,
          error: null,
        })
      }
    }

    fetchStats()
  }, [])

  if (stats.loading) {
    return <div className="loading">Loading statistics...</div>
  }

  if (stats.error) {
    return <div className="error">{stats.error}</div>
  }

  return (
    <div className="admin-stats">
      <div className="stats-grid">
        <div className="stat-card books">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>Total Books</h3>
            <p className="stat-number">{stats.totalBooks}</p>
          </div>
        </div>

        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Registered Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card borrows">
          <div className="stat-icon">📖</div>
          <div className="stat-info">
            <h3>Active Borrows</h3>
            <p className="stat-number">{stats.activeBorrows}</p>
          </div>
        </div>

        <div className="stat-card overdue">
          <div className="stat-icon">⏰</div>
          <div className="stat-info">
            <h3>Overdue Books</h3>
            <p className="stat-number">{stats.overdueBooks}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStats