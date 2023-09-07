import React from "react";
import ReactDOM from "react-dom/client";
import modalBody from "./components/modal";
import "./css/modal.css";
import "./css/cart-container.css"
import "./css/summary-container.css"
import "./css/order-detail.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <div className="modal">
      <form className="form">
        <div className="payment--options">
          <button name="paypal"></button>
          <button name="paypal"></button>
          <button name="paypal"></button>
        </div>
        <div className="separator">
          <hr className="line" />
          <p>or pay using credit card</p>
          <hr className="line" />
        </div>

        <div className="credit-card-info--form">
          <div className="input_container">
            <label for="password_field" className="input_label">
              Card Holder Full Name
            </label>
            <input
              id="password_field"
              className="input_field"
              placeholder="Enter your full name"
            />
          </div>

          <div className="input_container">
            <label for="password_field" className="input_label">
              Card Number{" "}
            </label>
            <input
              id="password_field"
              className="input_field"
              type="number"
              placeholder="0000 00000 00000 0000"
            />
          </div>

          <div className="input_container">
            <label for="password_field" className="input_label">
              {" "}
              Expiry Date / CVV{" "}
            </label>

            <div className="split">
              <input
                autoComplete="off"
                id="password_field"
                className="input_field"
                placeholder="01/23"
              />
              <input
                id="password_field"
                className="input_field"
                type="number"
                placeholder="CVV"
              />
            </div>
          </div>
        </div>
        <button className="purchase--btn">Checkout</button>
      </form>
    </div> */}


{/* ----- TARJETA DE PRODUCTOS ------ */}
<div className="cart-container">
  <div className="cart-header">
    <h1>Your Cart</h1>
    <p>Total: $0.00</p>
  </div>

  <div className="items-list">
    <div className="item">
      <div className="item-details">
        <img
          className="item-image"
          src="tshirt.jpg"
          alt="T-Shirt"
        />
        <div className="item-info">
          <span className="item-title">T-Shirt</span>
          <span className="item-price">$16.40</span>
        </div>
      </div>
      
      <div className="quantity-control">
        <button className="quantity-button">-</button>
        <input className="item-quantity" value="0" />
        <button className="quantity-button">+</button>
      </div>
    </div>

    <div className="item">
      <div className="item-details">
        <img
          className="item-image"
          src="tshirt.jpg"
          alt="T-Shirt"
        />
        <div className="item-info">
          <span className="item-title">T-Shirt</span>
          <span className="item-price">$16.40</span>
        </div>
      </div>
      
      <div className="quantity-control">
        <button className="quantity-button">-</button>
        <input className="item-quantity" value="0" />
        <button className="quantity-button">+</button>
      </div>
    </div>
    -- More items can be added here --
  </div>

  <div className="checkout-button-container">
    <button className="checkout-button">Proceed to Checkout</button>
  </div>
</div>



{/* <!-- Checkout Container --> */}
<div class="checkout-container">
  {/* <!-- Order Summary Card --> */}
  <div class="order-summary-card">
    <h2>Order Summary</h2>
    <ul class="order-items">
      {/* <!-- Example item in the order summary --> */}
      <li>
        <span class="item-name">T-Shirt</span>
        <span class="item-total">$32.80</span>
        <div class="quantity-control">
          <button class="quantity-button decrement-button">-</button>
          <input type="text" class="item-quantity" value="2"></input>
          <button class="quantity-button increment-button">+</button>
        </div>
      </li>

      <li>
        <span class="item-name">T-Shirt</span>
        <span class="item-total">$32.80</span>
        <div class="quantity-control">
          <button class="quantity-button decrement-button">-</button>
          <input type="text" class="item-quantity" value="2"></input>
          <button class="quantity-button increment-button">+</button>
        </div>
      </li>
      {/* <!-- Add more items here if needed --> */}
    </ul>
    <p class="total">
      Total Items: <span class="item-count">2</span> | Total Price: $<span class="total-price">32.80</span>
    </p>
    
    {/* <!-- Payment Method Section --> */}
    <div class="payment-method">
      <h3>Payment Method</h3>
      <input type="radio" id="apple-pay" name="payment-method" value="apple-pay"></input>
      <label for="apple-pay">Apple Pay</label>
      <input type="radio" id="credit-card" name="payment-method" value="credit-card"></input>
      <label for="credit-card">Credit Card</label>
      <input type="radio" id="paypal" name="payment-method" value="paypal"></input>
      <label for="paypal">PayPal</label>
    </div>
    
    {/* <!-- Proceed to Pay Button --> */}
    
  </div>

  <div className="pay-button-container">
  <button class="proceed-to-pay-button">Proceed to Pay</button>
  </div>
</div>


{/* ---- Order Detail ------ */}
<div class="order-detail-container">
        <h1>Your Order Details</h1>
        <div class="order-summary">
            <p><strong>Order Number:</strong> #123456</p>
            <p><strong>Order Date:</strong> August 30, 2023</p>
            <p><strong>Total Items:</strong> 3</p>
            <p><strong>Total Price:</strong> $45.90</p>
        </div>
        <div class="ordered-items">
            <h2>Ordered Items</h2>
            <ul>
                <li>
                    <span class="item-name">T-Shirt</span>
                    <span class="item-quantity">2</span>
                    <span class="item-total">$32.80</span>
                </li>
                <li>
                    <span class="item-name">Jeans</span>
                    <span class="item-quantity">1</span>
                    <span class="item-total">$13.10</span>
                </li>
            </ul>
        </div>
        <p class="thank-you-message">Thank you for your order!</p>
    </div>

  </>
);
