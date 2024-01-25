import React, { useState, useEffect } from 'react';

function CustomerInfoForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
        },
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('User data:', data);
      console.log('Response headers:', response.headers);
      console.log('Response status:', response.status);
      console.log('Response text:', await response.text());
  
      // Update form data with user information
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
        email: data.email || '',
        streetAddress: data.streetAddress || '',
        city: data.city || '',
        state: data.state || '',
        postalCode: data.postalCode || '',
      });
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Fetch user data when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.phone && formData.email) {
      onFormSubmit(formData);
      console.log('Form data submitted:', formData);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="customer-info-container">
      <h2>Customer Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last-name">Last Name:</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="address-inputs">
          <label htmlFor="street-address">Street Address:</label>
          <input
            type="text"
            id="street-address"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="e.g., 123 Main St."
            required
          />

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />

          <label htmlFor="postal-code">Postal Code:</label>
          <input
            type="text"
            id="postal-code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CustomerInfoForm;
