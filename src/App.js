import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import FeedApp from './components/FeedApp';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [requiresLogin, setRequiresLogin] = useState(true);

  return (
    <Router>
        <div className="app">
        <Sidebar />
        <div className="main-content">
            <Navbar requiresLogin={requiresLogin} setRequiresLogin={setRequiresLogin} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<FeedApp requiresLogin={requiresLogin} setRequiresLogin={setRequiresLogin} />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
        </div>
    </Router>
  );
};

export default App;
