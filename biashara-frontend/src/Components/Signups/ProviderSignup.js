import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProviderSignup.css';
import logo from '../Assests/Logo.png';
import leftImage from '../Assests/login.jpg';


function ProviderSignup() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUserName ] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [usernameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [genericError, setGenericError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const [strength, setStrength] = useState('');

  const validatePassword = (password) => {
    const strengthCriteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const strength = Object.values(strengthCriteria).reduce((acc, cur) => acc + cur, 0);

    switch (strength) {
      case 5:
        return 'Strong';
      case 4:
        return 'Good';
      case 3:
        return 'Medium';
      default:
        return 'Weak';
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(validatePassword(newPassword));

  }

  const onButtonClick = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    // Reset any previous error messages
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setGenericError('');
    setPhoneError('');
    setUserNameError('');
    
    // validate username
    if (!username.trim()) {
      setUserNameError('Name is required')
    }

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    // validate location
    if (!location.trim()) {
      setLocationError('Location is required')
    }

    // validate description
    if (!description.trim()) {
      setDescriptionError('Description is required')
    }
    // validate phone
    if (!phone.trim()) {
      setPhoneError('Phone Number is required')
    }
    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }
    

    //confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      return;
    }
    const role = 'provider'
    try {
      // Make HTTP POST request to the login API endpoint
      const response = await fetch('http://localhost:5000/api/auth/provider/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, phone, location, description, password, role }),
      });

      // Parse response
      const data = await response.json();
      console.log(data)

      // Handle successful login
      if (response.ok) {
        // Redirect the user to the dashboard or home page upon successful login
        navigate('/login');
      } else {
        // Handle login failure
        // For now, display error message received from the server
        setGenericError(data.message);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error occurred during signup:', error);
      // Display a generic error message to the user
      setGenericError('An error occurred during signup. Please try again.');
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
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={username}
              placeholder="John Doe"
              onChange={(ev) => setUserName(ev.target.value)}
              className="inputBox"
            />
            <label className="errorLabel">{usernameError}</label>
          </div>
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
          <div className='form-group'>
            <input
              type="text"
              name="phone"
              value={phone}
              placeholder="+254742079321"
              onChange={(ev) => setPhone(ev.target.value)}
              className="inputBox"
            />
            <label className="errorLabel">{phoneError}</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="location"
              value={location}
              placeholder="The Piano, BrookSide drive"
              onChange={(ev) => setLocation(ev.target.value)}
              className="inputBox"
            />
            <label className="errorLabel">{locationError}</label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="description"
              value={description}
              placeholder="What do you do"
              onChange={(ev) => setDescription(ev.target.value)}
              className="inputBox"
            />
            <label className="errorLabel">{descriptionError}</label>
          </div>
          <div className="form-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="inputBox"
            />
            <label className="errorLabel">{passwordError}</label>
            <span onClick={togglePasswordVisibility} className="togglePassword">
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <div className="form-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              className="inputBox"
            />
            <label className="errorLabel">{passwordError}</label>
            <label className='errorLabel'>{strength}</label>
            <span onClick={togglePasswordVisibility} className="togglePassword">
              {showPassword ? 'Hide' : 'Show'}
            </span>
            {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
          </div>
          <div className="terms-text">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
          {genericError && <label className="errorLabel">{genericError}</label>}
          <button type="submit" className="signup-button">Create Account</button>
        </form>
      </div>
    </div>
  )
};

export default ProviderSignup;