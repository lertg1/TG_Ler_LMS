
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import "../../styles/Auth.css"
import axios from "axios"

function Register() {
  const [formData, setFormData] = useState({
    userID: 0,
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: ""
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    // Basic validation
    if (formData.userPassword !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match")
      return
    }

    if (formData.userPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long")
      return
    }

    try {
      // Filter out confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = formData
      await axios.post("http://localhost:8080/api/auth/register", {
        ...registrationData,
        userRole: "member" // Default role for registration
      })

      setSuccessMessage("Registration successful! Redirecting to login...")

      // Redirect to login after successful registration
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      if(error.response) {
        console.error(error.response.data.message);
      } else {
        console.error("An unexpected error occured");
      }
      setErrorMessage(error.message || "Failed to register account")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Fill in your details to get started</p>
        </div>

        {errorMessage && <div className="auth-error">{errorMessage}</div>}
        {successMessage && <div className="auth-success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
          <div className="form-group">
              <label htmlFor="userId">User ID</label>
              <input
                type="integer"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="Enter your User ID"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter your User name"
                required
              />
            </div>

            
          </div>

          <div className="form-group">
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

            <div className="form-group">
              <label htmlFor="userPassword">Password</label>
              <input
                type="password"
                name="userPassword"
                value={formData.userPassword}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
            </div>
          

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
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

export default Register

