import React, { useEffect, useState } from 'react';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/bookings/getBooksByUserId?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Error fetching orders');
                }

                const data = await response.json();
                console.log(data)
                setOrders(data);
            } catch (err) {
                setError(err.message || 'Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
        // eslint-disable-next-line
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>My Orders</h1>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>
                            <h3>Product ID: {order.productId}</h3>
                            <p>Order Details: {JSON.stringify(order)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default MyOrders;
