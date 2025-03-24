import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import MemberDashboard from "./pages/member/MemberDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"
import NotFound from "./pages/NotFound"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import "./App.css"
import ProtectedRoute from "./components/ProtectedRoute"

// function ProtectedRoute({ children, roles = [] }) {
//   const { user, loading } = useAuth()

//   if (loading) {
//     return <div className="loading">Loading...</div>
//   }

//   if (!user || (roles.length > 0 && !roles.includes(user.role))) {
//     return <Navigate to="/login" replace />
//   }

//   return children
// }

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} /> */}

          {/* Member routes */}
          <Route
            path="/member/*"
            element={
              <ProtectedRoute roles={["member", "staff"]}>
                <MemberDashboard/>
                {/* <Routes>
                  <Route path="/" element={<MemberDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes> */}
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute roles={["staff"]}>
                <AdminDashboard/>
                {/* <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/books" element={<BookManagement />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/circulation" element={<CirculationManagement />} />
                  <Route path="*" element={<NotFound />} />
                </Routes> */}
              </ProtectedRoute>
            }
          />

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

