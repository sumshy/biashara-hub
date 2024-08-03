import React, { useState } from 'react';
import LoginNav from './LoginNav';
import './Help.css'; // Import your CSS file for styling
import Heroimg from "../Assests/Helphero.png"
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import { FaQuestionCircle, FaUserCog, FaCogs, FaHandsHelping, FaPhone, FaStar } from 'react-icons/fa';

import Footer from '../Footer/Footer';

function Help() {
  const [activeIndex, setActiveIndex] = useState(null);

  const onContactClick = () => {
    toast.info('Form submitted successfully', {
      autoClose: 3000, // Duration for auto close
      hideProgressBar: true, // Hide progress bar
      closeOnClick: true, // Close on click
      draggable: true, // Allow dragging to dismiss
      pauseOnHover: true, // Pause on hover
    });
  }

  const faqItems = [
    {
      id: 1,
      question: 'How do I get started?',
      answer: 'To get started, simply create an account and follow the on-screen instructions to set up your profile.',
    },
    {
      id: 2,
      question: 'How do I manage my account?',
      answer: 'You can manage your account settings by navigating to the admin section in your dashboard.',
    },
    {
      id: 3,
      question: 'How do I contact support?',
      answer: 'You can contact our support team via the contact us page or by calling our support hotline.',
    },
    {
      id: 4,
      question: 'How can I share my experience?',
      answer: 'We welcome all feedback! Please visit our feedback page to share your experience with us.',
    },
  ];

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

    const helpItems = [
        {
          id: 1,
          icon: <FaQuestionCircle />,
          title: 'Getting Started',
          text: 'Learn how to start using our platform efficiently.',
        },
        {
          id: 2,
          icon: <FaUserCog />,
          title: 'Admin',
          text: 'Manage your account settings and preferences.',
        },
        {
          id: 3,
          icon: <FaCogs />,
          title: 'Account Setup',
          text: 'Setup your account to get started.',
        },
        {
          id: 4,
          icon: <FaHandsHelping />,
          title: 'We Are Here to Help',
          text: 'Reach out to our support team for assistance.',
        },
        {
          id: 5,
          icon: <FaPhone />,
          title: 'Immediate Assistance',
          text: 'Contact us for urgent issues.',
        },
        {
          id: 6,
          icon: <FaStar />,
          title: 'Share Your Experience',
          text: 'Tell us about your experience with our platform.',
        },
      ];

      const [isContactFormVisible, setIsContactFormVisible] = useState(false);

      const handleContactButtonClick = () => {
        setIsContactFormVisible(true);
      };
    
      const handleCloseButtonClick = () => {
        setIsContactFormVisible(false);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        onContactClick();
        setIsContactFormVisible(false);
      };
  return (
    <div>
      <LoginNav />
      <div className="help-section">
        <div className="help-content">
          <h1>How can we help you today?</h1>
          <p>"Need a hand? Click here to explore our helpful resources and support options. Whether you have questions, need guidance, or simply want to learn more, our dedicated help page is here to assist you every step of the way. Don't hesitate to reach out—we're here to help!"</p>
          <button className="contact-button" onClick={handleContactButtonClick}>Contact Us</button>
        </div>
        <div className="hero-image">
          <img src={Heroimg} alt="Hero" />
        </div>
      </div>

      {isContactFormVisible && (
        <div className="contact-form-overlay">
          <div className="contact-form">
            <button className="close-button" onClick={handleCloseButtonClick}>
              <FaTimes />
            </button>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="complaint">Complaint</label>
              <textarea id="complaint" name="complaint" rows="4" required></textarea>

              <button type="submit">Submit</button>
            </form>
            <ToastContainer /> {/* Add ToastContainer to your component tree */}
          </div>
        </div>
        )}
   

      <div className='help-cat'>
        {helpItems.map(item => (
          <div key={item.id} className='help-card'>
            <div className='icon'>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>


      <div className='help-accordion'>
        {faqItems.map((item, index) => (
          <div key={item.id} className='accordion-item'>
            <div className='accordion-header' onClick={() => toggleAccordion(index)}>
              <span>{item.question}</span>
              {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className='accordion-content' style={{ display: activeIndex === index ? 'block' : 'none' }}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='footer'> <Footer/></div>
    </div>
  );
}

export default Help;
