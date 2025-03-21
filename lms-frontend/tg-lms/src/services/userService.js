import { api } from "./api"

// For admin use - get all users with pagination
export const getUsers = async (page = 0, size = 20) => {
  try {
    const response = await api.get(`/users?page=${page}&size=${size}`)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const searchUsers = async (query, page = 0, size = 20) => {
  try {
    const response = await api.get(`/users/search?query=${query}&page=${page}&size=${size}`)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

function handleError(error) {
  if (error.response) {
    return new Error(error.response.data.message || "Server error")
  } else if (error.request) {
    return new Error("No response from server. Please check your internet connection.")
  } else {
    return new Error("An error occurred. Please try again.")
  }
}

