import React from 'react';
import Slider from 'react-slick'; // Import the Slider component from react-slick
import fashionImage from "../Assests/F1.png"; // Update paths to your images
import artisansImage from "../Assests/artsan.png";
import foodImage from "../Assests/food.jpg";
import cleaningImage from "../Assests/tools.jpg";
import './CategoryCarousel.css'

const CategoriesCarousel = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust as needed
    slidesToScroll: 1,
  };

  return (
    <div className="categories-section">
    
      <h2 className="categories-heading">Categories</h2>
      <Slider {...settings}>
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
          <img src={cleaningImage} alt="Appliance Category" className="category-img" />
          <p className="category-name">Appliance</p>
        </div>
      </Slider>
    </div>
  );
};

export default CategoriesCarousel;
