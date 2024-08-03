import React from 'react';
import TopNavbar from './TopNavbar';
import './Dashboard.css';
import Sidebar from './Sidebar';
import ResetPassword from '../Signups/ResetPassword';
//import DashboardContent from './DashboardContent';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar/>
      <div className="main-content">
        <TopNavbar />
        <ResetPassword />
      </div>
    </div>
  );
}

export default Dashboard;
