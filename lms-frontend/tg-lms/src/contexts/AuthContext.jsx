import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  logoutUser,
} from "../services/authService"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in on component mount
    const user = localStorage.getItem("user")
    if (user) {
      const userData = JSON.parse(user)
      setUser(userData)
      setIsAuthenticated(true)  
      setUserRole(userData.role)
    }
    setLoading(false) 
    },[])

  const login = async (email, password) => {
    setLoading(true)
    setError("")
    try {
      // Authenticate user
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        userEmail: email,
        userPassword: password,
      })
      
      // Get user details including role
      const userDetails = await axios.get(`http://localhost:8080/api/users/email/${email}`)
      const userData = {
        ...userDetails.data,
        token: response.data.token, // Asuming the loin endpoint returns a token
      }
      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(userData))

      // Update state
      setUser(userData)
      setIsAuthenticated(true)
      setUserRole(userData.userRole)

      return userData
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    } 
  }
  // Logout function
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)
    setUserRole(null)

  }
  // Check if user has required role
  const hasRole = (roles) => {
    if (!userRole) return false
    return roles.includes(userRole)
}
  const register = async (userData) => {
    setLoading(true)
    setError("")
    try {
      const response = await registerUser(userData)
      return response
    } catch (err) {
      setError(err.message || "Registration failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

 
  // const requestPasswordReset = async (email) => {
  //   setLoading(true)
  //   setError("")
  //   try {
  //     const response = await forgotPassword(email)
  //     return response
  //   } catch (err) {
  //     setError(err.message || "Password reset request failed")
  //     throw err
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const confirmPasswordReset = async (token, newPassword) => {
  //   setLoading(true)
  //   setError("")
  //   try {
  //     const response = await resetPassword(token, newPassword)
  //     return response
  //   } catch (err) {
  //     setError(err.message || "Password reset failed")
  //     throw err
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    requestPasswordReset,
    confirmPasswordReset,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

