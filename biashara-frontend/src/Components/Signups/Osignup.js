import React from 'react';
import './Osignup.css';
import logo from '../Assests/Logo.png'; 
import signimg from '../Assests/login.jpg';

function Osignup() {
  return (
    <div className="osignup-container">
      <div className="osignup-left">
        <img src={signimg} alt="Left mm" className="osignup-image" />
      </div>
      <div className="osignup-right">
        <img src={logo} alt="Logo" className="osignup-logo" />
        <div className="osignup-buttons">
          <a href="/Psignup" className="osignup-button">Sign Up as a Service Provider</a>
          <a href="/Ssignup" className="osignup-button">Sign Up as a Service Seeker</a>
        </div>
        <p className="osignup-text">Already a user? <a href="/login">Login</a></p>
        <p className="osignup-text">By signing up you agree to our Terms and Conditions and Privacy Policy.</p>
      </div>
    </div>
  );
}

export default Osignup;
