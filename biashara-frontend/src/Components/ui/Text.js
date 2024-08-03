import React from 'react';
import './Text.css'; // Assuming you create a CSS file for this component

const Text = ({ children, variant = 'description', className }) => {
    return (
        <div className={`text ${variant} ${className}`}>
            {children}
        </div>
    );
};

export default Text;
