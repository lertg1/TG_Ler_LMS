import { api } from "./api"

export const getBooks = async (page = 0, size = 20, sort = "title", filter = {}) => {
  try {
    const params = { page, size, sort, ...filter }
    const response = await api.get("/books", { params })
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const getBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const searchBooks = async (query, page = 0, size = 20) => {
  try {
    const params = { query, page, size }
    const response = await api.get("/books/search", { params })
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const getPopularBooks = async (limit = 10) => {
  try {
    const response = await api.get(`/books/popular?limit=${limit}`)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

// Admin functions
export const createBook = async (bookData) => {
  try {
    const response = await api.post("/books", bookData)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const updateBook = async (id, bookData) => {
  try {
    const response = await api.put(`/books/${id}`, bookData)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/books/${id}`)
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

