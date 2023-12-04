import React from 'react';
import "../css/cart-container.css"

function CartContainer({ cartItems, updateQuantity, total, onCheckoutClick, customerName }) {
  return (
    <div className="cart-container">
      {/* Cart header section */}
      <div className="cart-header">
        <h1>Your Cart {customerName && customerName}</h1>
        <p>Total: ${total.toFixed(2)}</p>
      </div>

      {/* List of items in the cart */}
      <div className="items-list">
        {cartItems.map((item, index) => (
          <div key={index} className="item">
            <div className="item-details">
              {/* Item image */}
              <img
                className="item-image"
                src="tshirt.jpg"
                alt={item.name}
              />
              {/* Item information */}
              <div className="item-info">
                <span className="item-title">{item.name}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Quantity control */}
            <div className="quantity-control">
              <button
                className="quantity-button"
                onClick={() => updateQuantity(index, item.quantity - 1)}
              >
                -
              </button>
              <input
                className="item-quantity"
                value={item.quantity}
                readOnly
              />
              <button
                className="quantity-button"
                onClick={() => updateQuantity(index, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout button */}
      <div className="checkout-button-container">
        <button className="checkout-button" onClick={onCheckoutClick}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartContainer;
