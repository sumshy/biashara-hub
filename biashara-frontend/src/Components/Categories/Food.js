import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Fashion.css';

import f4 from "../Assests/food.jpg";
import f5 from "../Assests/food1.jpg";
import f6 from "../Assests/food2.jpg";


const Food = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const fashionItems = [
    {
      id: 1,
      image: f4,
      name: 'The collective',
      text: 'Get all kind of delicacies within your reach and get it delivered to you, get to select and buy in the comfort of your house',
    },
    {
      id: 2,
      image: f5,
      name: 'CJs restaurant',
      text: 'Get all kind of meals within your reach and get it delivered to you, get to select and buy in the comfort of your house',
    },
    {
      id: 3,
      image: f6,
      name: 'KFC',
      text: 'KFC brings affordable meals to the comfort of your home. No more searching for food, that’s why we are here',
    },
  ];

  const handleViewDetails = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleViewSeller = () => {
    navigate('/book');
  };

  return (
    <div className="fashion-section">
      <div className="fashion-header">
        <h2>Food</h2>
        <a href="/foodmore" className="view-more">
          <span>View More</span>
          <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
        </a>
      </div>
      <div className="fashion-cards">
        {fashionItems.map(item => (
          <div key={item.id} className="fashion-card">
            <img src={item.image} alt={item.name} className="fashion-image" />
            <h3 className="fashion-name">{item.name}</h3>
            <p className="fashion-text">{item.text}</p>
            <button className="view-details-button" onClick={() => handleViewDetails(item)}>
              Book Service
            </button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <img src={selectedItem.image} alt={selectedItem.name} className="modal-image" />
            <h3 className="modal-name">{selectedItem.name}</h3>
            <p className="modal-text">{selectedItem.text}</p>
            <button className="book-now-button" onClick={handleViewSeller}>
              View Seller
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Food;
