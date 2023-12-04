import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app.jsx';
import './css/checkout-container.css';
import './css/order-detail.css';
import './css/customer-info.css';

// Create a root for ReactDOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component within the root
root.render(
  <>
    <App />
  </>
);
