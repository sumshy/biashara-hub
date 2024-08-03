import React from 'react';
import { FaUser,FaSignOutAlt, FaUniversalAccess } from 'react-icons/fa';
import './SideNav.css';

function SideNav() {
  return (
    <div className="sidenav">
      <ul>
        <li>
          <FaUniversalAccess className="icon" />
          <a href="/categories">Services</a>
        </li>
        {/* <li>
          <FaPaintBrush className="icon" />
          <a href="/hairstyles">Settings</a>
        </li> */}
        <li>
          <FaUser className="icon" />
          <a href="/profile">Profile</a>
        </li>
        <li><FaSignOutAlt /> Logout</li>
      </ul>
    </div>
  );
}

export default SideNav;
