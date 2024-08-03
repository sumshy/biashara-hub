import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProviderSignup.css';
import logo from '../Assests/Logo.png';
import leftImage from '../Assests/moving3.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [genericError, setGenericError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onButtonClick = async (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');
    setGenericError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('authToken', data.token); // Assuming token is returned as 'token'
        localStorage.setItem('username', data.name);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data._id)
        
        // Redirect to the homepage or dashboard
        navigate('/');
      } else {
        setGenericError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      setGenericError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="provider-signup-container">
      <div className="left-section">
        <img src={leftImage} alt="LeftImage" className="left-image" />
      </div>
      <div className="right-section">
        <img src={logo} alt="Logo" className="signup-logo" />
        <h2 className="signup-heading">Biashara Hub</h2>
        <form className="signup-form" onSubmit={onButtonClick}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="johndoe@email.com"
              onChange={(ev) => setEmail(ev.target.value)}
              className="inputBox"
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <div className="form-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={(ev) => setPassword(ev.target.value)}
              className="inputBox"
            />
            <label className="errorLabel">{passwordError}</label>
            <span onClick={togglePasswordVisibility} className="togglePassword">
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          {genericError && <label className="errorLabel">{genericError}</label>}
          <button type="submit" className="signup-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
