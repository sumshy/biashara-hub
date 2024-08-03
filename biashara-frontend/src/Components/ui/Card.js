'use client';
import React from 'react';
import Text from './Text';
import { StarIcon } from './Icon';
import './Card.css'; // Assuming you create a CSS file for this component

const Card = ({
    className,
    src,
    miniTitle,
    title,
    rating,
    reviewCount,
    price,
    tag,
    type,
}) => {
    return (
        <div className={`card-container ${className}`}>
            {src && title && (
                <div className={`image-wrapper ${type === 'category' ? 'category-height' : 'default-height'}`}>
                    <img src={src} alt={title} className="card-image" />
                </div>
            )}
            <Text variant="infoXs" className="mt-4">
                {miniTitle}
            </Text>
            <Text variant="productTitle">{title}</Text>
            {rating && reviewCount && price && (
                <>
                    <div className="rating-reviews">
                        <div className="rating-stars">
                            <StarIcon rating={rating} />
                        </div>
                        <Text variant="infoXs">{reviewCount} reviews</Text>
                    </div>
                    <Text variant="price">${price.toLocaleString()}</Text>
                </>
            )}
        </div>
    );
};

export default Card;
