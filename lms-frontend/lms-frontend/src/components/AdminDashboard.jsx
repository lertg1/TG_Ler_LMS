import { useState } from "react"
import "./AdminDashboard.css"
import Sidebar from "./Sidebar"
import ManageItems from "./ManageItems"

function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState("manageItems")

  const renderPage = () => {
    switch (currentPage) {
      case "manageItems":
        return <ManageItems />
      case "manageUsers":
        return (
          <div className="content-area">
            <h1>Manage Users</h1>
          </div>
        )
      case "circulation":
        return (
          <div className="content-area">
            <h1>Circulation</h1>
          </div>
        )
      default:
        return <ManageItems />
    }
  }

  return (
    <div className="admin-container">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="main-content">{renderPage()}</div>
    </div>
  )
}

export default AdminDashboard

