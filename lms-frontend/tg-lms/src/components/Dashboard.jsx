import React from 'react';
import { useAuth } from '../contexts/AuthContext';  

const Dashboard = () => {
    const { user,
        setUser,
        isLoggedIn,
    setIsLoggedIn} = useAuth();
    const logIn = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);   
        setUser({
            Name: 'petrina@gmail.com'
        })  
    };
    const logOut = (e) => {
        e.preventDefault();
        setIsLoggedIn(false);   
        setUser(null);    
    };
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the Library Management System Dashboard!</p>
            <span>User is currently: {isLoggedIn ? 'Logged-In' : 'Logged Out'}.</span>
            <br/>{isLoggedIn?(<span>User name: {user.Name}</span>):null}
            <br />
            <br />
            {isLoggedIn ? <button onClick={(e) => { logOut(e) }} className="logout-button">
                Logout
            </button> : <button onClick={(e) => {logIn(e)}} className="login-btn">
                Login
            </button>}
            
            
          </div>   
    );
};

export default Dashboard;