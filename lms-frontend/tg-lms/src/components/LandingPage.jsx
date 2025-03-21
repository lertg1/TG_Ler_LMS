import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div>
    <h1>Welcome to the Library Management System</h1>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </div>
);

export default LandingPage;