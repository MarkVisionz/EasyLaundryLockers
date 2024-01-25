import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CartContainer from './cart-container';
import CheckoutContainer from './checkout-container';
import OrderDetailContainer from './orderDetail-container';
import CustomerInfoForm from './CustomerInfoForm';
import UserDashboard from './UserDashboard';
import LandingPage from './LandingPage';
import RegistrationForm from './RegistrationForm';
import PrivateRoute from './PrivateRoute';

function App() {
  const history = useHistory();

  const [cartItems, setCartItems] = useState([
    {
      name: "T-Shirt",
      price: 16.40,
      quantity: 0
    },
    {
      name: "Jeans",
      price: 29.90,
      quantity: 0
    }
    // Add more items here
  ]);

  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutInfo, setCheckoutInfo] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const updateQuantity = (index, newQuantity, isCheckout) => {
    const updatedItems = [...(isCheckout ? checkoutItems : cartItems)];

    newQuantity = Math.max(newQuantity, 0);

    updatedItems[index].quantity = newQuantity;
    if (isCheckout) {
      if (newQuantity >= 1) {
        setCheckoutItems(updatedItems);
      }
    } else {
      setCartItems(updatedItems);
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const onRemoveItem = (index) => {
    const updatedCheckoutItems = [...checkoutItems];
    updatedCheckoutItems.splice(index, 1);
    setCheckoutItems(updatedCheckoutItems);
  };

  const handleCheckoutClick = () => {
    const checkedOutItems = cartItems.filter(item => item.quantity > 0);
    setCheckoutItems(checkedOutItems);
    setShowCheckout(true);
  };

  const handleCustomerInfoSubmit = (formData) => {
    setCustomerInfo(formData);
  };

  const handleRegistration = async (formData, history) => {
    try {
      console.log('Attempting registration...');
  
      const response = await axios.post('http://localhost:5000/api/register', {
        username: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
        address: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        phone: formData.phone,
      });
  
      // Save the token in local storage
      const { token, user } = response.data;
      console.log(response.data); // Log the entire response for debugging
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Check if history is defined before using the replace method
      if (history) {
        console.log('History object:', history); // Log the history object for debugging
        // Redirect to the user dashboard with user information in the state
        console.log('State before replace:', { state: { user } });
        history.push('/userdashboard', { state: {user} });
        console.log('State after replace:', { state: { user } });

      } else {
        console.error('History object is undefined.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  };
  


  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/register">
          <RegistrationForm onFormSubmit={(formData, history) => handleRegistration(formData, history)} />

          </Route>
          <Route path="/order">
            {!customerInfo ? (
              <CustomerInfoForm onFormSubmit={handleCustomerInfoSubmit} />
            ) : !showCheckout ? (
              <CartContainer
                cartItems={cartItems}
                updateQuantity={(index, newQuantity) => updateQuantity(index, newQuantity, false)}
                total={calculateTotalPrice(cartItems)}
                onCheckoutClick={handleCheckoutClick}
                customerName={`${customerInfo.firstName}`}
              />
            ) : (
              <CheckoutContainer
                checkoutItems={checkoutItems}
                updateQuantity={(index, newQuantity) => updateQuantity(index, newQuantity, true)}
                total={calculateTotalPrice(checkoutItems)}
                onRemoveItem={onRemoveItem}
                setCheckoutItems={setCheckoutItems}
                customerInfo={customerInfo}
              />
            )}
          </Route>
          <PrivateRoute path="/userdashboard" component={UserDashboard} />
        </Switch>
        {checkoutInfo && (
          <OrderDetailContainer orderDetails={checkoutInfo} />
        )}
      </div>
    </Router>
  );
}

export default App;
