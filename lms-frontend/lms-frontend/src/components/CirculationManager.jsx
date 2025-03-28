import { useState } from "react"
import Circulation from "./Circulation"
import CheckIn from "./CheckIn"
import CheckOut from "./CheckOut"

function CirculationManager() {
  const [view, setView] = useState("main")

  const renderView = () => {
    switch (view) {
      case "main":
        return <Circulation setCirculationView={setView} />
      case "checkout":
        return <CheckOut />
      case "checkin":
        return <CheckIn />
      default:
        return <Circulation setCirculationView={setView} />
    }
  }

  return renderView()
}

export default CirculationManager

