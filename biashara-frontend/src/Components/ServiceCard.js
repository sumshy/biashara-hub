import React from 'react';
import Text from './ui/Text';
import './ServiceCard.css';

const ServiceCard = ({ 
    title,  
}) => {
    return (
        <div className="service-item">
            <Text variant="t" className="service-title">
                {title}
            </Text>
        </div>
    );
};

export default ServiceCard;
