import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function UserDashboard({ onLogout }) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token available");
        }

        // Simulate a delay for demonstration purposes (e.g., 2 seconds)
        setTimeout(async () => {
          const response = await axios.get(
            "http://localhost:5000/api/users/:id",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setUser(response.data.user);
          setLoadingUserData(false);
        }, 2000); // 2000 milliseconds (2 seconds)
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        // Handle the error, e.g., show an error message to the user
        setLoadingUserData(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.get(
        "http://localhost:5000/api/dashboard/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching user orders:", error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleNewOrderClick = () => {
    history.push("/order", { user, token: localStorage.getItem("token") });
  };

  const handleLogoutClick = async () => {
    try {
      setLoggingOut(true);

      // Introduce a delay (e.g., 2 seconds) before initiating logout
      setTimeout(async () => {
        const response = await axios.get("http://localhost:5000/api/logout");

        if (response.data.message === "Logout successful") {
          onLogout();
          // Redirect to a blank page with a message indicating "Logging Out..."
          history.push("/");
        } else {
          console.error("Logout failed:", response.data.message);
        }
        setLoggingOut(false);
      }, 2000); // 2000 milliseconds (2 seconds)
    } catch (error) {
      console.error("Error during logout:", error.message);
      // Handle the error, e.g., show an error message to the user
      setLoggingOut(false);
    }
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-content">
        {loadingUserData ? (
          <div>Loading...</div>
        ) : (
          <>
            <h2>Welcome, {user?.name || "Guest"}!</h2>
            <p>This is your user dashboard.</p>

            <div>
              <h3>Your Information:</h3>
              <p>Email: {user.username}</p>
              <p>Name: {user.name}</p>
              <p>Phone: {user.phone}</p>
              <p>Address: {user.address}</p>
              {/* Add other user information fields as needed */}
            </div>

            <h3>Your Orders:</h3>
            {orders.length === 0 ? (
              <p>No orders created yet.</p>
            ) : (
              <ul>
                {orders.map((order, index) => (
                  <li key={index}>
                    <p>Order Number: {order.orderNumber}</p>
                    <p>Order Date: {order.orderDate}</p>
                    <p>Delivery Address: {order.deliveryAddress}</p>
                    <p>Total Items: {order.totalItems}</p>
                    <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                    {/* Render other order details as needed */}
                  </li>
                ))}
              </ul>
            )}

            <button className="new-order-button" onClick={handleNewOrderClick}>
              Create New Order
            </button>

            {loggingOut ? (
              <div>Logging Out...</div>
            ) : (
              <button
                className="logout-button"
                onClick={handleLogoutClick}
                disabled={loggingOut}
              >
                Logout
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
