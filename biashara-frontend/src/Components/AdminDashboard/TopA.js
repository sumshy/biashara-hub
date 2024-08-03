import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './TopA.css';
import logo from '../Assests/Admin.png'; // Make sure to replace this with the actual path to your logo

function TopA() {
  return (
    <div className="topnav">
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo" />
        <span className="dashboard-text">Admin Dashboard</span>
      </div>
      <div className="right-section">
      </div>
    </div>
  );
}

export default TopA;
