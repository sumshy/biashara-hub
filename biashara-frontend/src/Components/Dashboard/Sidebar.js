import React from 'react';
import { FaUser, FaCogs, FaSignOutAlt, FaClipboardList, FaChessBoard } from 'react-icons/fa';
// import { AiFillSetting } from 'react-icons/ai';
import './Sidebar.css';
import logo from "../Assests/Logo.png"

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        {/* Add your logo here */}
        <img src={logo} alt="Logo" />
      </div>
      <ul>
        <li><FaChessBoard /> Dashboard</li>
        <li><FaUser /> Providers</li>
        <li><FaClipboardList /> Services</li>
        {/* <li><AiFillSetting /> Management</li> */}
        <li><FaCogs /> Settings</li>
        <li><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;
