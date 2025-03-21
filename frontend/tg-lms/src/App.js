import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { LoginTwoTone } from '@mui/icons-material';
import landingPage from './components/landingPage';
import resetPassword from './components/resetPassword';
import UserRegistration from './components/userRegistration';
import UserLogin from './components/userLogin';
import OPAC from './components/opac';
import memberPage from './components/memberPage';
import adminPage from './components/adminPage';


function App() {
  return (
    <Router>

      <Switch>
        <Route path="/" exact Component={landingPage} />
        <Route path="/login" component={UserLogin} />
        <Route path="/register" component={UserRegistration} />
        <Route path="/reset-password" component={resetPassword} />        
        <Route path="/member" component={memberPage} />
        <Route path="/admin" component={adminPage} />
        <Route path="/opac" component={OPAC} />
      </Switch>
    </Router>
  );
}
    
      {/* <Box sx={{ '&button':{m:5}}}>
      <div className="flex min-h-screen felx-col">
        <header className="bg-primary text-primary-foreground py-6">
          <div className="container mx-auto px-4">
            <h1 className="text-3x1 font-bold">Library Portal</h1>
            </div>
        </header>
        </div>
        <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold tracking-tight">Welcome to the Library Portal</h2>
          <p className="text-xl text-muted-foreground">
            Access our extensive collection of books, manage your account, and more.
          </p>
          <div className="button-group">
            <Button variant="contained" endIcon={<LoginTwoTone />} size="medium" 
             component ={Link} to= "/login"
            >Login</Button>
            <Button variant="contained" size="medium" component={Link} to= "/register">Register as Member</Button>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Library Portal. All rights reserved.
        </div>
      </footer>
        <nav>
        <ul>
            <li>
            <Link to="/admin/book-management">Book Management</Link>
            </li>
            <li>
            <Link to="/admin/user-management">User Management</Link>
            </li>
            <li>
            <Link to="/circulation">Circulation</Link>
            </li>
            <li>
            <Link to="/opac">OPAC</Link>
            </li>
            <li>
            <Link to="/reports">Reports</Link>
            </li>
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
        <Route path="/admin/book-management" element={<BookManagement />} />
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/circulation" element={<Circulation />} />
        <Route path="/opac" element={<OPAC />} />
        <Route path="/reports" element={<Reports />} />
        </Routes>
      </Box>
    
  );
} */}

export default App;