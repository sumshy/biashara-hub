import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // Retrieve role and authentication token from local storage
    const role = localStorage.getItem('role');
    const isAuthenticated = !!localStorage.getItem('authToken');

    // Check if the user is authenticated
    if (isAuthenticated) {
        if (role==='seeker') {
            // If authenticated, render the child routes
            return <Outlet />;
        } else if (role==='provider') {
            return<Outlet />
        } else if (role==='admin') {
            return <Outlet />
        } else {
            return <Navigate to="/" />
        }
    } else {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
