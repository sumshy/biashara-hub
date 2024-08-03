import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // Importing Font Awesome search icon
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css";
import mission from "../Assests/Ms2.png";
import appwork from "../Assests/Appwork.png";
import testimonial from "../Assests/Testimonial.png"
import testimonial1 from "../Assests/Testimonial.png"
import testimonial2 from "../Assests/Testimonial.png"
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import CategoriesCarousel from './CategoryCarousel';


function Home() {
  const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission

        const trimmedTerm = searchTerm.trim().toLowerCase(); // Normalize input

        // Check against predefined categories
        if (trimmedTerm === 'food') {
            navigate('/foodmore');
        } else if (trimmedTerm === 'fashion') {
            navigate('/fashionmore');
        } else if (trimmedTerm === 'appliance') {
            navigate('/appliancemore');
        } else if (trimmedTerm === 'moving') {
            navigate('/movingmore');
        } else {
            // Show error message as a pop-up
            toast.error('Search not found', {
              autoClose: 3000, // Duration for auto close
              hideProgressBar: true, // Hide progress bar
              closeOnClick: true, // Close on click
              draggable: true, // Allow dragging to dismiss
              pauseOnHover: true, // Pause on hover
            });
        }
    };
  return (
    <div>
       <Navigation/>
    <div className='BiasharaHome'>
        <div className="hero-section1">
        <div className="hero-content">
          <div className="search-container">
              <form onSubmit={handleSearch}>
                  <input
                      type="text"
                      placeholder="What do you need help with?"
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
                  />
                  <button type="submit" className="search-icon">
                      <FaSearch />
                  </button>
              </form>
              <ToastContainer /> {/* Add ToastContainer to your component tree */}
          </div>
          <div className="text-container">
            <h1 className="heading">"Discover Trusted Service Providers in Kenya"</h1>
            <p className="subheading">Whether you're a service seeker looking for quality assistance or a talented individual ready to showcase your skills. Join us today and unlock a world of opportunities!</p>
          </div>
        </div>
      </div>


      
      <div className="mission-content">
        <div className="mission-text">
          <h2 className="mission-heading">Our Mission</h2>
          <p className="mission-subheading">Our mission is to make it easy for Kenyans to find all kinds of services in one place. We want to help people connect with trustworthy professionals and showcase their own skills. By doing this, we hope to make it simpler for everyone to get things done and create more opportunities for businesses and individuals across Kenya.</p>
        </div>
        <div className="mission-image">
          <img src={mission} alt="MissionImage" className="mission-img" />
        </div>
      </div>
    

      <div className="how-it-works-section">
      <div className="how-it-works-content">
        <div className="how-it-works-image">
          <img src={appwork} alt="How It WorksImage" className="app-works-img" />
        </div>
        <div className="how-it-works-text">
          <h2 className="how-it-works-heading">How the app works</h2>
          <p className="how-it-works-description">Our mission is to make it easy for Kenyans to find all kinds of services in one place. We want to help people connect with trustworthy professionals and showcase their own skills. By doing this, we hope to make it simpler for everyone to get things done and create more opportunities for businesses and individuals across Kenya</p>
        </div>
      </div>
    </div>
    <CategoriesCarousel />
    {/* change to carousel */}
    {/* <div className="categories-section">
      <h2 className="categories-heading">Categories</h2>
      <div className="categories-list">
        <div className="category-item">
          <img src={fashionImage} alt="Fashion Category" className="category-img" />
          <p className="category-name">Fashion</p>
        </div>
        <div className="category-item">
          <img src={artisansImage} alt="Artisans Category" className="category-img" />
          <p className="category-name">Artisans</p>
        </div>
        <div className="category-item">
          <img src={foodImage} alt="Food Category" className="category-img" />
          <p className="category-name">Food</p>
        </div>
        <div className="category-item">
          <img src={cleaningImage} alt="Cleaning Category" className="category-img" />
          <p className="category-name">Appliance</p>
        </div>
      </div>
    </div>
 */}

    <div className="testimonials-section">
      <h2 className="testimonials-heading">Testimonials</h2>
      <div className="testimonials-list">
        <div className="testimonial-item">
          <img src={testimonial} alt="Testimonial 1" className="testimonial-img" />
          <p className="testimonial-name">Praise Godwins</p>
          <p className="testimonial-text">"We are really impressed with the Real Estate value and paying method in Particular."</p>

        </div>
        <div className="testimonial-item">
          <img src={testimonial1} alt="Testimonial 2" className="testimonial-img" />
          <p className="testimonial-name">Emmanuel Bett</p>
          <p className="testimonial-text">"We are really impressed with the Real Estate value and paying method in Particular."</p>
        </div>
        <div className="testimonial-item">
          <img src={testimonial2} alt="Testimonial 3" className="testimonial-img" />
          <p className="testimonial-name">Faith Martins</p>
          <p className="testimonial-text">"We are really impressed with the Real Estate value and paying method in Particular."</p>
        </div>
      </div>
    </div>

    <Footer/>

    </div>
    </div>
  );
}

export default Home;
