import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaFilter } from 'react-icons/fa';
import './DashboardContent.css';

function DashboardContent() {
  const [userCount, setUserCount] = useState([]);
  const [merchant, setMerchant] = useState([])

  // Function to get the auth token
  const getAuthToken = () => {
      return localStorage.getItem('authToken'); // Modify based on how you store the token
  };

  const fetchUsers = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5000/api/admin/getUsers', {
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
      setUserCount(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };
  const fetchMerchants = async () => {
    try {
        const token = getAuthToken();
        const response = await fetch('http://localhost:5000/api/admin/getMerchants', {
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
        setMerchant(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
    }
  };
  useEffect(() => {
    fetchMerchants();
    fetchUsers();
  })
  return (
    <div className="dashboard-container">
      <div className="left-column">
        <h3>In The Last 30 Days</h3>
        <div className="cards">
          <div className="card">{userCount.count} Active Users</div>
          <div className="card">{merchant.count} Active Service Providers</div>
          <div className="card">{userCount.count - merchant.count} Service Seekers</div>
        </div>
        <h2>All Providers</h2>
        <div className="search-filter">
          <input type="text" placeholder="Search Providers" />
          <button><FaFilter /></button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Provider Name</th>
              <th>Status</th>
              <th>Ratings</th>
              <th>Services Offered</th>
            </tr>
          </thead>
          <tbody>
            {/* Populate with data */}
            <tr>
              <td>Provider 1</td>
              <td>Verified</td>
              <td>4.5</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="right-column">
        <div className="most-used">
          <h4>Most Used Providers</h4>
          <div className="card-u">
            <ul>
              <li>Provider A: 10 Requests, 8 Customers</li>
              <li>Provider B: 8 Requests, 5 Customers</li>
            </ul>
            <button>View All Providers</button>
          </div>
        </div>
        <div className="frequently-used">
          <h3>Frequently Used Services</h3>
          <div className="card-u">
            <ul>
              <li>Service A: Weekly</li>
              <li>Service B: Monthly</li>
            </ul>
            <button>View Services </button>
          </div>
        </div>
        <div className="timestamp">
          <p>{new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;
