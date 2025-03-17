import React, { useState } from 'react';
import axios from 'axios';


const UserRegistration = () => {
    const [user, setUser] = useState({
        userId: 1,
        userName: '',
        userEmail: '',
        userPassword: ''
    });
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', user);
            
            console.log(response.data);
        } catch (error) {
            console.error('Error', error);
        }
    };
        return (
            <form onSubmit={handleSubmit}>
                <input type="int" name="userId" value={user.userId} onChange={handleChange} placeholder='User ID' required />
                <input type="text" name="userName" value={user.userName} onChange={handleChange} placeholder='User Name' required />
                <input type="email" name="userEmail" value={user.userEmail} onChange={handleChange} placeholder='Email Address' required />
                <input type="password" name="userPassword" value={user.userPassword} onChange={handleChange} placeholder='Password' required />
                <input type="text" name="userRole" value={user.userRole} onChange={handleChange} placeholder='Role' required />
                <button type="submit">Register</button>
            </form>
        );
};
export default UserRegistration;