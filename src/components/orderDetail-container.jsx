import React from 'react';

// Function to generate the current date
function generateCurrentDate() {
  const currentDate = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return currentDate.toLocaleDateString('en-US', options);
}

// Function to generate a unique order ID
function generateOrderID() {
  const prefix = 'ORD'; // Static prefix for order IDs
  const timestamp = new Date().getTime(); // Using timestamp as a unique identifier
  const random = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999

  // Combine the prefix, timestamp, and random number to create a unique order ID
  const orderID = `${prefix}${timestamp}${random}`;
  return orderID;
}

function OrderDetailContainer({ orderDetails }) {
  const currentDate = generateCurrentDate();
  const orderID = generateOrderID();

  return (
    <div className="order-detail-container">
      <h2>Order Details</h2>
      <div className="order-details">
        <p><strong>Order Number:</strong> {orderID}</p>
        <p><strong>Order Date:</strong> {currentDate} </p>
        <p><strong>Customer Name:</strong> {orderDetails.userName}</p>
        <p><strong>Delivery Address:</strong> {orderDetails.deliveryAddress}</p>
        <p><strong>Total Items:</strong> {orderDetails.totalItems}</p>
        <p><strong>Total Price:</strong> ${orderDetails.totalPrice.toFixed(2)}</p>
      </div>
      
      {/* Ordered Items */}
      <div className="ordered-items">
        <h2>Ordered Items</h2>
        <ul>
          {orderDetails.orderedItems.map((item, index) => (
            <li key={index}>
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">{item.quantity}</span>
              <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Thank You Message */}
      <p className="thank-you-message">Thank you for your order!</p>
    </div>
  );
}

export default OrderDetailContainer;
