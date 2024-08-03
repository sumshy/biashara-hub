import React from 'react';
import './Loader.css'; // Assuming you create a CSS file for this component

const Loader = () => {
    return (
        <div className="loading-wave">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
        </div>
    );
};

export default Loader;
