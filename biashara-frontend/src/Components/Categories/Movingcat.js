import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import { toast } from 'react-hot-toast';
import './Fashioncat.css';
import Navigation from '../Navigation/Navigation';

const Movingcat = () => {
    const [products, setProducts] = useState([]);
    const category = 'Moving'; // Set the default or desired category
    const pageNumber = 1; // Consider making this state if you want to implement pagination
    const [limit] = useState(10); // Correctly initialize limit using useState

    // Function to get the auth token
    const getAuthToken = () => {
        return localStorage.getItem('authToken'); // Modify based on how you store the token
    };

    const fetchProducts = async () => {
        try {
            const token = getAuthToken();
            const response = await fetch(`http://localhost:5000/api/client/getProductsByCategory/?category=${category}&pageNumber=${pageNumber}&limit=${limit}`, {
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
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to fetch products');
        }
    };
    localStorage.setItem('category', category)
    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, pageNumber, limit]); // Correct dependency array

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div className="grid grid-cols-4 gap-4 flex-1">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        productId={product._id}
                        src={product.imageUrl}
                        title={product.name}
                        date={new Date(product.createdAt).toLocaleDateString()}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default Movingcat;
