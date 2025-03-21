
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import "../../styles/Auth.css"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const { requestPasswordReset, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    if (!email) {
      setErrorMessage("Please enter your email")
      return
    }

    try {
      await requestPasswordReset(email)
      setSuccessMessage("Password reset instructions have been sent to your email")
      setEmail("") // Clear the email field after successful submission
    } catch (err) {
      setErrorMessage(err.message || "Failed to request password reset")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Forgot Password</h2>
          <p>Enter your email to reset your password</p>
        </div>

        {errorMessage && <div className="auth-error">{errorMessage}</div>}
        {successMessage && <div className="auth-success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Sending..." : "Reset Password"}
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

export default ForgotPassword

