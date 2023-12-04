const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Define your order schema fields here
  orderNumber: String,
  orderDate: Date,
  userName: String,
  deliveryAddress: String,
  totalItems: Number,
  totalPrice: Number,
  orderedItems: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema);
