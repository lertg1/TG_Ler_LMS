import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserRegistration from './components/userRegistration';
import UserLogin from './components/userLogin';
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/register">User Registration</Link>
            </li>
            <li>
              <Link to="/login">User Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/login" element={<UserLogin />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
