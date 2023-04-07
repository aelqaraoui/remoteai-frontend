import React from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import authServiceInstance from '../services/auth.service';

const Navbar = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authServiceInstance.logout();
    props.setRequiresLogin(true);
    navigate('/');
  };

  const isAuthenticated = localStorage.getItem('user');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {isAuthenticated ? (
          <ul className="nav-links">
            <li>
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>
            <li>
              <button className="nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        ) : (
          <ul className="nav-links">
            <li>
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;
