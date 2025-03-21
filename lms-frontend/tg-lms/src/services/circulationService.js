import { api } from "./api"

export const getBorrowHistory = async (userId = null, page = 0, size = 20) => {
  try {
    let url = "/circulation"
    if (userId) {
      url += `/user/${userId}`
    }
    url += `?page=${page}&size=${size}`

    const response = await api.get(url)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const borrowBook = async (userId, bookId, dueDate) => {
  try {
    const response = await api.post("/circulation/borrow", {
      userId,
      bookId,
      dueDate,
    })
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const returnBook = async (borrowId) => {
  try {
    const response = await api.post(`/circulation/return/${borrowId}`)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const getCurrentBorrows = async (userId = null) => {
  try {
    let url = "/circulation/current"
    if (userId) {
      url += `?userId=${userId}`
    }

    const response = await api.get(url)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const getOverdueBooks = async (page = 0, size = 20) => {
  try {
    const response = await api.get(`/circulation/overdue?page=${page}&size=${size}`)
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

