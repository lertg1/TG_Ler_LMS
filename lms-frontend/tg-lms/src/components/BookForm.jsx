"use client"

import { useState, useEffect } from "react"
import "../styles/Forms.css"

function BookForm({ mode, initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publicationYear: "",
    publisher: "",
    genre: "",
    language: "English",
    pageCount: "",
    available: true,
    description: "",
    coverImageUrl: "",
  })

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData)
    }
  }, [mode, initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="form-modal">
      <div className="form-container">
        <h2>{mode === "add" ? "Add New Book" : "Edit Book"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author*</label>
            <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="isbn">ISBN*</label>
              <input type="text" id="isbn" name="isbn" value={formData.isbn} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="publicationYear">Publication Year</label>
              <input
                type="number"
                id="publicationYear"
                name="publicationYear"
                value={formData.publicationYear}
                onChange={handleChange}
                min="1000"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input type="text" id="publisher" name="publisher" value={formData.publisher} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <input type="text" id="language" name="language" value={formData.language} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="pageCount">Page Count</label>
              <input
                type="number"
                id="pageCount"
                name="pageCount"
                value={formData.pageCount}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="coverImageUrl">Cover Image URL</label>
            <input
              type="url"
              id="coverImageUrl"
              name="coverImageUrl"
              value={formData.coverImageUrl}
              onChange={handleChange}
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
              Available for borrowing
            </label>
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {mode === "add" ? "Add Book" : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookForm

