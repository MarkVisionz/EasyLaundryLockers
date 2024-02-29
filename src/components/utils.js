// utils.js

// Function to generate the current date in a readable format
export function generateCurrentDate() {
    const currentDate = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return currentDate.toLocaleDateString('en-US', options);
  }
  
  // Function to generate a unique order ID
  export function generateOrderID() {
    const prefix = 'ORD'; // Static prefix for order IDs
    const timestamp = new Date().getTime(); // Using timestamp as a unique identifier
    const random = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    
    // Combine the prefix, timestamp, and random number to create a unique order ID
    return `${prefix}${timestamp}${random}`;
  }
  