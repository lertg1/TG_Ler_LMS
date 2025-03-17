import React, { useState } from 'react';
import axios from 'axios';

const UserLogin = () => {
    const [loginData, setLoginData] = useState({
        userEmail: '',
        userPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', loginData);
            console.log(response.data);
        }
        catch (error) {
            console.error('Error', error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="userEmail" value={loginData.userEmail} onChange={handleChange} placeholder='Email' required/>
            <input type="password" name="userPassword" value={loginData.userPassword} onChange={handleChange} placeholder='Password' required/>
            <button type="submit">Login</button>
        </form>
    );
}

export default UserLogin;
