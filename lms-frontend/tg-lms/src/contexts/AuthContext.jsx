"use client"

import { createContext, useContext, useState, useEffect } from "react"
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  logoutUser,
} from "../services/authService"

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkAuth = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (err) {
        console.error("Authentication check failed:", err)
        // Clear any invalid tokens
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    setError("")
    try {
      const response = await loginUser(email, password)
      localStorage.setItem("token", response.token)
      setUser(response.user)
      return response.user
    } catch (err) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
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

  const logout = async () => {
    try {
      await logoutUser()
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      localStorage.removeItem("token")
      setUser(null)
    }
  }

  const requestPasswordReset = async (email) => {
    setLoading(true)
    setError("")
    try {
      const response = await forgotPassword(email)
      return response
    } catch (err) {
      setError(err.message || "Password reset request failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const confirmPasswordReset = async (token, newPassword) => {
    setLoading(true)
    setError("")
    try {
      const response = await resetPassword(token, newPassword)
      return response
    } catch (err) {
      setError(err.message || "Password reset failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

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

