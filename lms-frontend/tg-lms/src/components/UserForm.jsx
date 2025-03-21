"use client"

import { useState, useEffect } from "react"
import "../styles/Forms.css"

function UserForm({ mode, initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    role: "MEMBER",
    active: true,
  })

  useEffect(() => {
    if (mode === "edit" && initialData) {
      const { password, ...rest } = initialData
      setFormData({
        ...rest,
        password: "",
        confirmPassword: "",
      })
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

    // Validate passwords match for new users
    if (mode === "add" && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    // For edit mode, only include password if it was changed
    let dataToSubmit
    if (mode === "edit" && !formData.password) {
      // Remove password fields if not changed
      const { password, confirmPassword, ...rest } = formData
      dataToSubmit = rest
    } else {
      // Remove confirmPassword field
      const { confirmPassword, ...rest } = formData
      dataToSubmit = rest
    }

    onSubmit(dataToSubmit)
  }

  return (
    <div className="form-modal">
      <div className="form-container">
        <h2>{mode === "add" ? "Add New User" : "Edit User"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name*</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name*</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={mode === "edit"} // Email can't be changed for existing users
            />
          </div>

          {(mode === "add" || (mode === "edit" && formData.password)) && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">{mode === "add" ? "Password*" : "New Password"}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={mode === "add"}
                  minLength="6"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">{mode === "add" ? "Confirm Password*" : "Confirm New Password"}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={mode === "add" || formData.password !== ""}
                  minLength="6"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows="3"></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="role">Role*</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange} required>
              <option value="MEMBER">Member</option>
              <option value="STAFF">Staff</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} />
              Active account
            </label>
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {mode === "add" ? "Add User" : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserForm

