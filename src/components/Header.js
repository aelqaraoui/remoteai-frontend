import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <aside className="sidebar">
      <h1>Remote AI Job Board</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {/* Add more navigation items as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Header;
