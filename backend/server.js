const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('mongodb+srv://markvisionz:marko1@laundry1.hfldevx.mongodb.net/easyLaundryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the order schema and model
const orderSchema = new mongoose.Schema({
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

const Order = mongoose.model('Order', orderSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Retrieve all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new order
app.post('/api/orders', async (req, res) => {
  const order = new Order(req.body);

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an order
app.patch('/api/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
