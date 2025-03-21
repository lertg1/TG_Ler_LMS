"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import "../../styles/Auth.css"

function ResetPassword() {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const { confirmPasswordReset, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get token from URL query parameters
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get("token")

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid or missing reset token. Please try requesting a new password reset.")
    }
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPasswords((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    if (!token) {
      setErrorMessage("Invalid reset token")
      return
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrorMessage("Passwords do not match")
      return
    }

    if (passwords.newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long")
      return
    }

    try {
      await confirmPasswordReset(token, passwords.newPassword)
      setSuccessMessage("Password has been reset successfully! Redirecting to login...")

      // Redirect to login after successful password reset
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (err) {
      setErrorMessage(err.message || "Failed to reset password")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Reset Password</h2>
          <p>Create a new password for your account</p>
        </div>

        {errorMessage && <div className="auth-error">{errorMessage}</div>}
        {successMessage && <div className="auth-success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              disabled={!token}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
              disabled={!token}
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading || !token}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Remember your password? <Link to="/login">Login</Link>
          </p>
          <p>
            <Link to="/" className="back-to-home">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword

