import React from 'react';
import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserDashboard = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const redirectToSignUp = () => {
        navigate('/Signup')
    }
    // State for email and password
    const { formData, setFormData } = useState({
        userEmail: "",
        userPassword: "",
    });

    // Handle input changes
    // const handleChange = async (e) => {
    //     const { name, value } = e.target
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     })
    // };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Sign in with: ", email);

        if (!email || !password) {
            setErrorMessage("Please enter both email and password");
            return  
        };

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                userEmail: email, userPassword: password,
            });
            setSuccessMessage("Login successful! Redirecting...");
            const userDetails = await axios.get(`http://localhost:8080/api/users/email/${email}`);
            const role = userDetails.data.userRole;
            const userName = userDetails.data.userName;
            console.log(`${userName} Login successful! Redirecting...`);
            if (role === "staff") {
                navigate("/adminPage");
            } else {
                navigate("/memberPage");
            }

        } catch (error) {
            setErrorMessage("Failed to login");
            console.log("Failed to login");
        };







    }
    return (

        <div className="container">
            <div className="header">
                <div className="text">Member Page</div>
                <div className="underline"></div>
                <div className="not-member">New user? <span onClick={redirectToSignUp}>Create an account!</span></div>            
            </div>
            {errorMessage && <div className="login-error">{errorMessage}</div>}
            {successMessage && <div className="login-success">{successMessage}</div>}
            <div className="inputs">

                <div className="input">
                    <input
                        type="email"
                        id="email"
                        autoComplete='email'
                        name="userEmail"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder='Enter your Email'
                        required
                    />
                </div>
                <div className="input">
                    <input
                        type="password"
                        id="password"
                        name="userPassword"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder='Enter your Password'
                        required
                    />
                </div>
            </div>
            <div className="forgot-password">Lost Password? <span>Click Here!</span></div>

            <div className="submit-container">
                <div className="submit" onClick={handleSubmit}>Sign In</div>
            </div>
        </div>
        
    );
}
export default UserDashboard;