import React from 'react';
import './Button.css'; // Assuming you create a CSS file for this component

const Button = ({
    title,
    className,
    size = 'medium',
    variant = 'primary',
    ...props
}) => {
    return (
        <button
            {...props}
            className={`button ${variant} ${size} ${className}`}
        >
            {title}
        </button>
    );
};

export default Button;
