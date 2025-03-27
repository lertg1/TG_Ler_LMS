import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Sign up with: ", email);

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                userId: id, userName: name, userEmail: email, userPassword: password, userRole: "member",
            });
            setSuccessMessage("Sign up successful! Redirecting...");
            const userDetails = await axios.get(`http://localhost:8080/api/users/email/${email}`);
            const role = userDetails.data.userRole;
            const userName = userDetails.data.userName;
            console.log(`${userName} Sign up successfully! Redirecting...`);
            setTimeout(()=>{navigate("/login")},5000);

        } catch (error) {
            setErrorMessage("Failed to Sign up");
            console.log("Failed to Sign up");
        };

    }



        return (

            <div className="container">
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>

                    {errorMessage && <div className="login-error">{errorMessage}</div>}
                    {successMessage && <div className="login-success">{successMessage}</div>}

                    <div className="inputs">
                        <div className="input">
                            <input
                                type="text"
                                id="userId"
                                autoComplete='userId'
                                name="userId"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder='Enter your User ID'
                                required
                            />
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                id="userName"
                                autoComplete='userName'
                                name="userName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter your Name'
                                required
                            />
                        </div>

                        <div className="input">
                            <input
                                type="email"
                                id="email"
                                autoComplete='email'
                                name="userEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your Password'
                                required
                            />
                        </div>
                    </div>
                </div>
            
                <div className="submit-container">
                    <div className="submit" onClick={handleSubmit}>Sign Up</div>

                </div>
            </div>
        
        );
    };
export default SignUp;
