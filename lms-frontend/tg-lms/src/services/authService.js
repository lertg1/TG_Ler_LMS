import { api } from "./api"

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password })
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email })
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post("/auth/reset-password", { token, newPassword })
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/current-user")
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout")
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

function handleError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return new Error(error.response.data.message || "Server error")
  } else if (error.request) {
    // The request was made but no response was received
    return new Error("No response from server. Please check your internet connection.")
  } else {
    // Something happened in setting up the request that triggered an Error
    return new Error("An error occurred. Please try again.")
  }
}

