'use client';
import DashboardCard from './DashboardCard';
import Loader from '../ui/Loader';
import { useEffect, useState } from 'react';
import { dateFormat } from '../../utils/dateFormat';
import './MyProduct.css'; // Make sure to import your CSS file


const MyProduct = () => {
    const [products, setProducts] = useState([]);
    
    const removeProduct = async (productId) => {
        const token = localStorage.getItem('authToken');
        await fetch('http://localhost:5000/api/merchant/deleteProduct', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `${token}`,
            },
            body: JSON.stringify({ productId }),
        });
        setProducts((prev) => prev.filter((list) => list._id !== productId));
    };
    
    useEffect(() => {
        const getProducts = async () => {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:5000/api/merchant/getProducts/', {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `${token}`,
                },
            });
            const result = await response.json();
            
            setProducts(result);
        };

        // Check if the token exists before fetching products
        if (localStorage.getItem('authToken')) {
            // eslint-disable-next-line
                getProducts();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="product-grid">
            {products.length > 0 ? (
                products.map((product) => (
                    <DashboardCard
                        key={product._id}
                        productId={product._id}
                        src={product.imageUrl}
                        title={product.name}
                        date={dateFormat(product.createdAt)}
                        removeProducts={removeProduct()}
                    />
                ))
            ) : (
                <Loader /> // Optionally show a loader or a message if there are no products
            )}
        </div>
    );
};

export default MyProduct;
