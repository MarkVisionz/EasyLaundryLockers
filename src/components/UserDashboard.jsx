import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function UserDashboard() {
  const history = useHistory();
  const location = useLocation();
  const { user: locationUser, token } = location.state || {};
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    // Check if user and token are not available
    if (!storedUser || !storedToken) {
      // Redirect to the landing page or handle as per your application logic
      history.replace('/');
      alert('You have redirected, User not defined');
    } else {
      setUser(storedUser);
    }
  }, [history]);

  const handleNewOrderClick = () => {
    history.push('/order', { user, token });
  };
  

  return (
    <div className="user-dashboard">
      <div className="dashboard-content">
        <h2>Welcome, {user?.name || 'Guest'}!</h2>
        <p>This is your user dashboard.</p>

        <button className="new-order-button" onClick={handleNewOrderClick}>
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
