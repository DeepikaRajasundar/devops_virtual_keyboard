import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Send signup data to the backend
            await axios.post('http://localhost:5000/signup', { username, password });
            setMessage("User registered successfully. You can now log in.");
            // Redirect to the login page after successful signup
            navigate('/login'); 
        } catch (err) {
            setMessage(err.response ? err.response.data.error : 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Signup</button>
            </form>
            {message && <p className="message">{message}</p>}
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Signup;
