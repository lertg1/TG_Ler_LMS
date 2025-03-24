// Desc: Login page for users to login to their account
import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import "../../styles/Auth.css"
import axios from "axios"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")  
  const [successMessage, setSuccessMessage] = useState("")
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    if (!email || !password) {
      setErrorMessage("Please enter both email and password")
      return
    }
    // await login(email, password)
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        userEmail: email, userPassword: password,
      });
    
      setSuccessMessage("Login successful! Redirecting...")
      // Redirect to login after successful registration
      setTimeout(() => {
        navigate("/")
      }, 2000)
      // Redirect based on role
      const userDetails = await axios.get(`http://localhost:8080/api/users/email/${email}`);
      const role = userDetails.data.userRole;

      if (role === "staff") {
        navigate("/admin")
      } else {
        navigate("/member")
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Failed to login");

      } else {
        setErrorMessage("An unexpected error occured");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Login to Your Account</h2>
          <p>Welcome back! Please enter your details</p>
        </div>

        {errorMessage && <div className="auth-error">{errorMessage}</div>}
        {successMessage && <div className="auth-success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              name ="userEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name ="userPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-extra">
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Create an account</Link>
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

export default Login

