import React from 'react'
import "./Footer.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
    <div className="footer-container">
      <div className="footer-column">
        <h3 className="footer-heading">Biashara Hub</h3>
        <p className="footer-text">we are always ready to help by providing the best service for you. We believe o live can make your life better.</p>
        <div className="social-icons">
          <FaInstagram className="social-icon" />
          <FaFacebook className="social-icon" />
          <FaTwitter className="social-icon" />
          <FaLinkedin className="social-icon" />
        </div>
      </div>
      <div className="footer-column">
        <h4 className="footer-subheading">Quick Links</h4>
        <ul className="footer-links">
          <li><a href='/'>Home</a></li>
          <li><a href='/#about'>About Us</a></li>
          <li><a href='/#mission'>Our Mission</a></li>
          <li><a href='/#services'>Services</a></li>
          <li><a href='/#testimonials-section'>Testimonials</a></li>
          <li><a href='/help'>Help</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h4 className="footer-subheading">Categories</h4>
        <ul className="footer-links">
          <li><a href='/categories'>All Categories</a></li>
          <li><a href='/fashionmore'>Fashion</a></li>
          <li><a href='/foodmore'>Food</a></li>
          <li><a href='/artisansmore'>Artisans</a></li>
          <li><a href='/movingmore'>Moving</a></li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="footer-column">
        <h4 className="footer-subheading">Subscribe</h4>
        <p className="footer-text">Stay updated with our latest news and offers.</p>
        <form className="subscribe-form">
          <input type="email" placeholder="Enter your email" className="subscribe-input" />
          <button type="submit" className="subscribe-button">Subscribe</button>
        </form>
      </div>
    </div>
  </footer>
);
}

export default Footer