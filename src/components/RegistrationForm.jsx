import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "../css/customer-info.css";

function RegistrationForm({ onFormSubmit }) {
  const history = useHistory();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (
      formData.firstName &&
      formData.lastName &&
      formData.phone &&
      formData.email &&
      formData.password
    ) {
      try {
        // Call the onFormSubmit function to handle registration
        await onFormSubmit(formData, history);

        // // Redirect to UserDashboard on successful registration
        // console.log(history); // Add this line for debugging
        // history.replace('/userdashboard');
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="customer-info-container">
      <h2>Registration</h2>
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

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
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
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
