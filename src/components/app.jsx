import React, { useState, useEffect } from 'react';
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
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';

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

  const [user, setUser] = useState(null);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutInfo, setCheckoutInfo] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [temporaryId, setTemporaryId] = useState('');

useEffect(() => {
  if (!isAuthenticated) {
    setTemporaryId(generateTemporaryId());
  }
}, [isAuthenticated]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/users/:id', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data.user);
        setIsAuthenticated(true);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);


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

  const generateTemporaryId = () => {
  // Generate a random temporary identifier
  return Math.random().toString(36).substring(2, 15);
};


const handleCheckoutClick = async () => {
  const checkedOutItems = cartItems.filter(item => item.quantity > 0);

  try {
    const response = await axios.post('http://localhost:5000/api/orders', {
      userId: isAuthenticated ? user._id : temporaryId,
      items: checkedOutItems
    });
    
    console.log(temporaryId);

    setCheckoutItems(checkedOutItems);
    setShowCheckout(true);
  } catch (error) {
    console.error('Error creating order:', error);
    // Handle error
  }
};


  
const handleCustomerInfoSubmit = (formData) => {
  // Merge the formData with the userId if it's a non-registered user
  const formDataWithUserId = isAuthenticated ? formData : { ...formData, userId: temporaryId };

  setCustomerInfo(formDataWithUserId);
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
  
  const handleLogout = () => {
    // Perform any necessary cleanup or additional logout steps
    // Clear the token from local storage
    localStorage.removeItem('token');
    // Update the authentication status
    setIsAuthenticated(false);
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
              <CustomerInfoForm isAuthenticated={isAuthenticated} onFormSubmit={handleCustomerInfoSubmit} />
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
                temporId={temporaryId}
              />
            )}
          </Route>

          <Route path="/login">
            <LoginForm/>
          </Route>

          <Route path="/adminDashboard">
            <Dashboard/>
          </Route>

          <PrivateRoute path="/userdashboard">
            <UserDashboard onLogout={handleLogout}/>
          </PrivateRoute>
        </Switch>
        {checkoutInfo && (
          <OrderDetailContainer orderDetails={checkoutInfo} />
        )}
      </div>
    </Router>
  );
}

export default App;
