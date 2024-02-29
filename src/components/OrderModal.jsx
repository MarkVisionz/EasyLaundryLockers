import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/modal.css';
import axios from 'axios';

function OrderDetailModal({ orderDetails, onClose }) {
  const [showModal, setShowModal] = useState(true);
  const history = useHistory();

  const handleCloseModal = async () => {
    try {
      let headers = {}; // Initialize headers object
  
      // Check if the user is logged in (token exists in localStorage)
      const token = localStorage.getItem('token');
      if (token) {
        // If logged in, include Authorization header with token
        headers.Authorization = `Bearer ${token}`;
      }
  
      // Make the request to create the order
      const response = await axios.post('http://localhost:5000/api/orders', orderDetails, {
        headers: headers // Include headers in the request
      });
  
      console.log('Order created successfully:', response.data);
  
      // If user is logged in, redirect to dashboard
      if (token) {
        history.push("/userdashboard");
      } else {
        // If user is not logged in, show alert and redirect to landing page
        alert("Your order was created successfully!");
        history.push("/");
      }
    } catch (error) {
      console.error('Error creating order:', error.message);
      // Handle error here (e.g., display an error message)
    }
  
    // Call onClose first, then close the modal
    onClose();
    setShowModal(false);
  };
  
  

  return (
    <section>
      {showModal && (
        <>
          <span className="overlay" onClick={handleCloseModal}></span>
          <div className="modal-box">
            <i className="fa-solid fa-circle-check">Check</i>
            <h2>Order Details</h2>
            <h3>You have successfully completed your order</h3>
            <div className="order-details">
              <p><strong>Order Number:</strong> {orderDetails.orderNumber}</p>
              <p><strong>Order Date:</strong> {orderDetails.orderDate}</p>
              <p><strong>User ID:</strong> {orderDetails.userId}</p>
              <p><strong>Customer Name:</strong> {orderDetails.userName}</p>
              <p><strong>Delivery Address:</strong> {orderDetails.deliveryAddress}</p>
              <p><strong>Total Items:</strong> {orderDetails.totalItems}</p>
              <p><strong>Total Price:</strong> ${orderDetails.totalPrice.toFixed(2)}</p>
            </div>
            <div className="buttons">
              <button className="close-btn" onClick={handleCloseModal}>
                Continue
              </button>
              <button>Cancel Order</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default OrderDetailModal;
