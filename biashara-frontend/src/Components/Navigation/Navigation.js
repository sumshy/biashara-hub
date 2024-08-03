import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../Assests/Logo.png";
import './Navigation.css';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
  }
  useEffect(() => {
    // Check if the authToken exists in local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="navigation">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="Biashara Hub Logo" className="logo-image" />
          <div className='logotext'>
            <p><b>Biashara Hub</b></p>
          </div>
        </div>
      </Link>
      <ul className="links">
        <li><Link className="link" to="/">Home</Link></li>
        <li><Link className="link" to="/categories">Categories</Link></li>
      </ul>
      <div className="nav-button-container">
        {isLoggedIn ? (
          <>
            <Link to="/profile">
              <button className="nav-button">Profile</button>
            </Link>
            <Link to="/login">
              <button className="nav-button" onClick={handleLogout}>Logout</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="nav-button">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="nav-button">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
