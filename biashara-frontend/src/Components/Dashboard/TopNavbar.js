import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './TopNavbar.css';

function TopNavbar() {
  return (
    <div className="top-navbar">
      <div className="search-section">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="text" placeholder="Search artists and projects" className="search-input" />
      </div>
      <div className="user-profile">
        <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
      </div>
    </div>
  );
}

export default TopNavbar;
