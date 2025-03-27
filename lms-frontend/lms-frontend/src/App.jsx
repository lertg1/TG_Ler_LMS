import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (      
  <div>
    <h1>Welcome to TG Library</h1>      
    <br />
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/memberPage" element={<UserDashboard />} />
          <Route path="/adminPage" element={<AdminDashboard />} />          
      </Routes>
    </Router>
  </div>

  );
}

export default App;
