import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNav from '../Dashboard/LoginNav';
import './Book.css';

function Book() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    quantity: '',
    location: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const dataToSubmit = {
      userId: localStorage.getItem('userId'),
      productId: localStorage.getItem('selectedProductId'),
      quantity: formData.quantity,
      location: formData.location,
    };
    console.log(dataToSubmit)
    try {
      const response = await fetch('http://localhost:5000/api/bookings/addBook', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      const result = await response.json();
      console.log(result);

      // Optionally, reset form or redirect user after successful submission
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      // Handle the error (e.g., show a notification)
    }
  };

  return (
    <div>
      <LoginNav />
      <div className="book-container">
        <h2>Book Service</h2>
        <form onSubmit={handleSubmit} className="book-form">
          
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="complete-button">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default Book;
