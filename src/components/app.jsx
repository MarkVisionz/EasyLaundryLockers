import React, { useState } from 'react';
import CartContainer from './cart-container';
import CheckoutContainer from './checkout-container';
import OrderDetailContainer from './orderDetail-container';
import CustomerInfoForm from './CustomerInfoForm';

function App() {
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

  return (
    <div className="app">
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
          customerInfo={customerInfo} // Passs CustomerInfo to Checkout container
        />
      )}
      {checkoutInfo && (
        <OrderDetailContainer orderDetails={checkoutInfo} />
      )}
    </div>
  );
}

export default App;