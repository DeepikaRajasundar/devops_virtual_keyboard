import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h1>Welcome to the Virtual Keyboard App</h1>
                <p>Your digital typing experience starts here.</p>
                <button className="get-started" onClick={() => navigate('/signup')}>
                    Get Started
                </button>
                <p className="alternative-action">
                    Already have an account? <span className="link" onClick={() => navigate('/login')}>Login</span>
                </p>
            </div>
        </div>
    );
}

export default Welcome;
