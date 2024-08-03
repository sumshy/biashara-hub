import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import './Mcategory.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Fashion from './Fashion';
import Food from './Food';
import Appliance from './Appliance';
import Moving from './Moving';
import Navigation from '../Navigation/Navigation';

function Mcategory() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Fashion',
    'Food',
    'Appliance',
    'Moving',
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const renderCategoryComponent = () => {
    switch (selectedCategory) {
      case 'Fashion':
        return <Fashion />;
      case 'Food':
        return <Food />;
      case 'Appliance':
        return <Appliance />;
      case 'Moving':
        return <Moving />;
      default:
        return (
          <>
            <Fashion />
            <Food />
            <Appliance />
            <Moving />
          </>
        );
    }
  };

  return (
    <div className='Mcategory '>
      <div>
        <Navigation />
      </div>
      <div className="hero-section">
        <div className="hero-content">
          <div className="text-container">
            <h1 className="heading">"Discover Trusted Service Providers in Kenya"</h1>
            <p className="subheading">Whether you're a service seeker looking for quality assistance or a talented individual ready to showcase your skills. Join us today and unlock a world of opportunities!</p>
          </div>
        </div>
      </div>

      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="categories-wrapper">
        <div className="categories-header">
          <FontAwesomeIcon icon={faChevronLeft} className="arrow-icon" />
          <h2>All Categories</h2>
          <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
        </div>
      </div>

      {renderCategoryComponent()}
      <Footer />
    </div>
  );
}

export default Mcategory;
