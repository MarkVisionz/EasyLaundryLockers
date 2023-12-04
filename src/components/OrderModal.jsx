import React, { useState } from 'react';
import '../css/modal.css';

function OrderDetailModal({ orderDetails, onClose }) {
  const [showModal, setShowModal] = useState(true);

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    onClose(); // Call the onClose prop to perform any additional actions
  };

  // Render the OrderDetailModal component
  return (
    <section>
      {showModal && (
        <>
          {/* Overlay to darken the background */}
          <span className="overlay" onClick={handleCloseModal}></span>

          {/* Modal Box */}
          <div className="modal-box">
            <i className="fa-solid fa-circle-check">Check</i>
            <h2>Order Details</h2>
            <h3>You have successfully completed your order</h3>
            
            {/* Display order details here */}
            <div className="order-details">
              <p><strong>Order Number:</strong> {orderDetails.orderNumber}</p>
              <p><strong>Order Date:</strong> {orderDetails.orderDate}</p>
              <p><strong>Customer Name:</strong> {orderDetails.userName}</p>
              <p><strong>Delivery Address:</strong> {orderDetails.deliveryAddress}</p>
              <p><strong>Total Items:</strong> {orderDetails.totalItems}</p>
              <p><strong>Total Price:</strong> ${orderDetails.totalPrice.toFixed(2)}</p>
            </div>

            {/* Buttons */}
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
