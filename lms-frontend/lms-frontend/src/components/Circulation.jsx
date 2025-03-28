function Circulation({ setCirculationView }) {
    return (
      <div className="content-area">
        <div className="header-container">
          <h1>Circulation</h1>
          <button className="logout-button">Logout</button>
        </div>
  
        <div className="circulation-buttons">
          <button className="circulation-button" onClick={() => setCirculationView("checkout")}>
            Check Out
          </button>
  
          <button className="circulation-button" onClick={() => setCirculationView("checkin")}>
            Check In
          </button>
        </div>
      </div>
    )
  }
  
  export default Circulation