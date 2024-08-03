import React from 'react';
import './UseProf.css';
import LoginNav from '../Dashboard/LoginNav';
import profile from "../Assests/prof.png";
import ResetPassword from '../Signups/ResetPassword';

function Userprof() {
  const username = localStorage.getItem('username')
  return (
    <div>
      <LoginNav />
      <div className="prof-cont">
        <div className="left-column">
          <img src={profile} alt="Profile" className="profile-image" />
          <div className="profile-details">
            <h2>{username}</h2>
            <p>Update and manage your account</p>
          </div>
          <div className="profile-actions">
            <p><a href='/help'>Help</a></p>
            
          </div>
        </div>
        <ResetPassword />
        {/* <div className="right-column">
          <label>Add Description</label>
          <textarea placeholder="Description" rows="5"></textarea>
          <input type="file" />
          <label>Add Skills or Additional Information</label>
          <input type="text" placeholder="Add Skills or Additional Information" />
          
        </div> */}
      </div>
    </div>
  );
}

export default Userprof;
