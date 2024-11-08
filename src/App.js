import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import VirtualKeyboard from './VirtualKeyboard';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Add Welcome page as the first route */}
                    <Route path="/" element={<Welcome />} />
                    
                    {/* Routing to the Signup page */}
                    <Route path="/signup" element={<Signup />} />
                    
                    {/* Routing to the Login page */}
                    <Route path="/login" element={<Login />} />
                    
                    {/* Routing to the Virtual Keyboard page */}
                    <Route path="/keyboard" element={<VirtualKeyboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
