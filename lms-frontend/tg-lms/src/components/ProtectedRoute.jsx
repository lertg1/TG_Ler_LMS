
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, userRole, loading } = useAuth()
  const location = useLocation()

  // Show loading state if still checking authentication
  if (loading) {
    return <div className="loading">Loading...</div>
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If authenticated but doesn't have the required role
  if (!roles.includes(userRole)) {
    // Redirect staff to admin, others to member
    if (userRole === "staff" || userRole === "admin") {
      return <Navigate to="/admin" replace />
    } else {
      return <Navigate to="/member" replace />
    }
  }

  // If authenticated and has the required role, render the children
  return children
}

export default ProtectedRoute
