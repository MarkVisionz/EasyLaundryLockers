import React, { useState } from 'react';
import OrderDetailContainer from './orderDetail-container';
import OrderDetailModal from './OrderModal';

function CheckoutContainer({ checkoutItems, updateQuantity, total, onRemoveItem, setCheckoutItems, customerInfo }) {

  // State to manage displaying order details and modal
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);

  // Function to generate the current date in a readable format
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

  // Create order details object
  const orderDetails = {
    orderNumber: generateOrderID(),
    orderDate: generateCurrentDate(),
    userName: `${customerInfo.firstName} ${customerInfo.lastName}`,
    deliveryAddress: `${customerInfo.streetAddress}, ${customerInfo.city}, ${customerInfo.postalCode}`,
    totalItems: checkoutItems.reduce((total, item) => total + item.quantity, 0),
    totalPrice: total,
    orderedItems: checkoutItems.filter(item => item.quantity > 0),
  };

  // Handle click to proceed to pay
  const handleProceedToPay = () => {
    // Set the order details and open the modal
    setIsOrderDetailModalOpen(true);
  };
  
  // Handle removing an item from checkout
  const handleRemoveItem = (index) => {
    const updatedItems = [...checkoutItems];
    updatedItems.splice(index, 1); // Remove the item
    setCheckoutItems(updatedItems);
  };

  

  return (
    <div className="checkout-container">
      <div className="order-summary-card">
        <h2>Order Summary</h2>
        <ul className="order-items">
          {checkoutItems.map((item, index) => (
            <li key={index}>
              <span className="item-name">{item.name}</span>
              <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
              <div className="quantity-control">
                <button
                  className="quantity-button decrement-button"
                  onClick={() => updateQuantity(index, item.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="text"
                  className="item-quantity"
                  value={item.quantity}
                  readOnly
                />
                <button
                  className="quantity-button increment-button"
                  onClick={() => updateQuantity(index, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <p className="total">
          Total Items: <span className="item-count">{checkoutItems.length}</span> | Total Pieces: <span className="item-count">{orderDetails.totalItems}</span> | Total Price: ${total.toFixed(2)}
        </p>

        <div className="delivery-address">
          <h3>Delivery Address</h3>
          <p>
            <strong>Address:</strong> {orderDetails.deliveryAddress}
          </p>
          <a href="#" className="change-address-link">
            Change Address
          </a>
        </div>

        <div className="payment-method">
          <h3>Payment Method</h3>
          <input
            type="radio"
            id="apple-pay"
            name="payment-method"
            value="apple-pay"
          />
          <label htmlFor="apple-pay">Apple Pay</label>
          <input
            type="radio"
            id="credit-card"
            name="payment-method"
            value="credit-card"
          />
          <label htmlFor="credit-card">Credit Card</label>
          <input
            type="radio"
            id="paypal"
            name="payment-method"
            value="paypal"
          />
          <label htmlFor="paypal">PayPal</label>
        </div>
        <button
          className="proceed-to-pay-button"
          onClick={handleProceedToPay}
        >
          Proceed to Pay
        </button>

        {/* Render OrderDetailModal if isOrderDetailModalOpen is true */}
        {isOrderDetailModalOpen && (
          <OrderDetailModal orderDetails={orderDetails} onClose={() => setIsOrderDetailModalOpen(false)} />
        )}

      </div>
    </div>
  );
}

export default CheckoutContainer;
