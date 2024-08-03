import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import './LoginNav.css';
import logo from "../Assests/Logo.png";

function LoginNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [isProvider, setIsProvider] = useState(false);
  const username = localStorage.getItem('username');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
  }


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === 'provider') {
      setIsProvider(true)
    }
  }, [])

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className="navbar">
      <div className="left-section">
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="Jiachilie Logo" className="logo-image" />
        </div>
      </Link>
      </div>
      <div className="right-section">
        <div className="user-profile" ref={dropdownRef}>
          <span className="user-greeting" onClick={handleProfileClick}>Hi {username}</span>
          <FontAwesomeIcon icon={faBars} className="hamburger-icon" onClick={toggleDropdown} />
          {dropdownOpen && (
            <div className="dropdown-content">
              {isProvider ? (
                <>
                  <a href="/dashboard">My Dashboard</a>
                  <a href="/categories">Categories</a>
                  <a href="/profile">Settings</a>
                  <a href="/help">Help</a>
                  <a href="/login">Logout</a>
                </>
              ) : (
                <>
                  <a href="/categories">Categories</a>
                  <a href="/profile">Settings</a>
                  <a href="/help">Help</a>
                  <a href="/login" onClick={handleLogout}>Logout</a>
                </>
              )}
            </div>
          )} 
        </div>
      </div>
    </div>
  );
}

export default LoginNav;