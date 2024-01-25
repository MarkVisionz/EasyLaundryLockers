// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/dashboard.css'

const Dashboard = () => {
  // State to store orders
  const [orders, setOrders] = useState([]);

  // Function to fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/orders');
      // Log the received data for debugging
      console.log('Orders:', response.data);
      // Update state with fetched orders
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // useEffect to fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array ensures it runs once on mount

  // Render the component
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order._id} className="order-item">
            <h3>Order Number: {order.orderNumber}</h3>
            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p>User Name: {order.userName}</p>
            <p>Delivery Address: {order.deliveryAddress}</p>
            <p>Total Items: {order.totalItems}</p>
            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>

            <h4>Ordered Items:</h4>
            <ul className="ordered-items-list">
              {order.orderedItems.map((item) => (
                <li key={item._id} className="ordered-item">
                  <p>Name: {item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
