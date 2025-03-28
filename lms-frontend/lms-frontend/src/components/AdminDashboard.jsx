import { useState } from "react"
import "./AdminDashboard.css"
import Sidebar from "./Sidebar"
import ManageItems from "./ManageItems"
import ManageUsers from "./ManageUsers"

function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState("manageItems")

  const renderPage = () => {
    switch (currentPage) {
      case "manageItems":
        return <ManageItems />
      case "manageUsers":
        return <ManageUsers />
      case "circulation":
        return <CirculationManager/>
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

