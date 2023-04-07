import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        {/* Replace with your logo */}
        <Link to="/" className='logo'><h1>remoteAI.ai</h1></Link>

      </div>
      <div className="menu">
        {/* Add menu items */}
        <ul>
          <li><Link to="/" className='logo'>Jobs</Link></li>
          <li><a href='https://buy.stripe.com/eVafZqeiUeRf46Y6ot' className='logo'>Post a job</a></li>
        </ul>
      </div>
      <div className="footer">
        {/* Add your footer content */}
        <p>remoteAI.ai is a personalized feed of remote AI jobs. create a profile to get personalized jobs that get you hired. this site is very much a work in progress. please send suggestions and feedback!</p>
        <a href='/'>Twitter</a> 
        <br/><br/>
      </div>
    </div>
  );
};

export default Sidebar;
