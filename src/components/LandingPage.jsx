// LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to EasyLaundry!</h1>
      <div className="buttons-container">
        <Link to="/order">
          <button className="order-button">Make an Order</button>
        </Link>
        <Link to="/register">
          <button className="register-button">Create Account</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
