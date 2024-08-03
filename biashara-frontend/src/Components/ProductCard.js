import React, { useState } from 'react';
import Text from './ui/Text';
import Button from './ui/Button';
import Loader from './ui/Loader';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ 
    title, 
    src, 
    date, 
    price,
    userId,
    productId // Added productId prop
}) => {
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

    const handler = () => {
        setLoader(true);
        localStorage.setItem('selectedProductId', productId); // Store product ID in local storage
        localStorage.setItem('selectedMerchantID', userId) // store merchant ID in local storage
        setTimeout(() => {
            navigate('/details');
        }, 1000); // Simulating a delay before navigation
    }

    return (
        <div className="product-card">
            <div className="image-container">
                <img src={src} alt={title} className="product-image" />
            </div>
            <Text variant="price" className="product-title">
                {title}
            </Text>
            <Text variant="infoXs" className="product-date">
                {date}
            </Text>
            <div className="product-footer">
                <Text variant="price" className="product-price">
                    ksh. {price.toLocaleString()}
                </Text>
                {loader ? (
                    <Loader />
                ) : (
                    <Button
                        variant="outline"
                        onClick={handler}
                        title="more details"
                    />
                )}
            </div>
        </div>
    );
};

export default ProductCard;
