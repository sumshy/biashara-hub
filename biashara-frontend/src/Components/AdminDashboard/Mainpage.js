import React from 'react';
import './Mainpage.css';
import MyProduct from './MyProduct'; // Import the MyProduct component
import MyOrders from './MyOrders'
function Mainpage() {
  return (
    <div className="mainpage">
      <div className="hh">
        <p>Manage your service effectively</p>
        <div className="button-container">
          <button>
            <a href='/dashboard/addproduct'>Create Service</a>
          </button>
        </div>
        {/* Insert MyProduct Component Here */}
        <MyProduct /> {/* This will render the product list below the existing content */}
        <MyOrders />
      </div>
    </div>
  );
}

export default Mainpage;
