
function Sidebar({ currentPage, setCurrentPage }) {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>TG Library</h1>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-button ${currentPage === "manageItems" ? "active" : ""}`}
            onClick={() => setCurrentPage("manageItems")}
          >
            Manage Items
          </button>
          <button
            className={`nav-button ${currentPage === "manageUsers" ? "active" : ""}`}
            onClick={() => setCurrentPage("manageUsers")}
          >
            Manage Users
          </button>
          <button
            className={`nav-button ${currentPage === "circulation" ? "active" : ""}`}
            onClick={() => setCurrentPage("circulation")}
          >
            Circulation
          </button>
        </nav>
      </div>
    )
  }
  
  export default Sidebar
  
  