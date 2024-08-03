import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import LoginNav from '../Dashboard/LoginNav';
import ProductCard from '../ProductCard';
import ServiceCard from '../ServiceCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import serviceImage from '../Assests/Service.png'; // Replace with the actual image path
import './Details.css';

function Details() {
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState([]);
  const [merchantProducts, setMerchantProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = localStorage.getItem('category');
  const providerID = localStorage.getItem('selectedMerchantID')
  localStorage.setItem('providerID', providerID)
  const handleBookServiceClick = () => {
    navigate('/book');
  }

  
  // Function to get the auth token
  const getAuthToken = () => {
    return localStorage.getItem('authToken'); // Modify based on how you store the token
  };
  const fetchMerchantsDetails = async () => {
    try {
      const token = getAuthToken();
      
      const response = await fetch('http://localhost:5000/api/client/getServiceProvider', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // Add the authorization header
        },
        body: JSON.stringify({ providerID }),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      setMerchant(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    };
  };
  const fetchMerchantsProducts = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5000/api/client/getProviderProducts/?pageNumber=1&limit=3', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // Add the authorization header
        },
        body: JSON.stringify({ providerID }),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      setMerchantProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    };
  }

  const fetchOtherProducts = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:5000/api/client/getProductsByCategory/?category=${category}&pageNumber=1&limit=6`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // Add the authorization header
        }
      });

      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      setOtherProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchMerchantsDetails(),
          fetchMerchantsProducts(),
          fetchOtherProducts(),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    
      <div>
        <LoginNav />
        <div className='Details'>
      
      <div>
        <h2>Service Provider Information</h2>
      </div>
      <div className='info1'>
        <div className='column'>
          <img src={serviceImage} alt='Service' className='service-image' />
        </div>
        <div className='column'>
          <h3>{merchant.provider.name}</h3>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          
          <div className='contact-info'>
            <p><FontAwesomeIcon icon={faPhone} /> {merchant.provider.phone}</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> {merchant.provider.email}</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {merchant.provider.location}</p>
          </div>
        </div>
        <div className='column'>
          <div className='card'>
            <h3>Description</h3>
            <p>{merchant.provider.description}</p>
            <button className='book-service' onClick={handleBookServiceClick}>Book Service</button>
          </div>
        </div>
      </div>

      <div className='info2'>
        <div className='column ads'>
          <h3>Ads by this Vendor</h3>
          <div className='ad-cards'>
            <div className="grid grid-cols-4 gap-4 flex-1">
              {merchantProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  productId={product._id}
                  src={product.imageUrl}
                  title={product.name}
                  date={new Date(product.createdAt).toLocaleDateString()}
                  price={product.price}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='column'>
          <h3>Other Services</h3>
          <div className='other-service'>
            {otherProducts.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Details;
