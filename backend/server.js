const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const errorHandler = require('./error-handler');
const User = require('./models/User');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Passport setup
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
mongoose.plugin(passportLocalMongoose);

// Passport serialize and deserialize functions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Passport local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        console.log('User not found');
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!(await user.isValidPassword(password))) {
        console.log('Incorrect password');
        return done(null, false, { message: 'Incorrect password.' });
      }

      console.log('Login successful', user);
      return done(null, user);
    } catch (error) {
      console.log('Error during login', error);
      return done(error);
    }
  })
);

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Add the decoded data to the request object
    req.decoded = decoded;
    next();
  });
};

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

// Retrieve all orders for the dashboard
app.get('/api/dashboard/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Use the error handler middleware
app.use(errorHandler);

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, name, phone, address, city, postalCode, state } = req.body;

    // Check if the username (email) is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Username (email) is already taken' });
    }

    // Manually hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the User instance with the hashed password
    const user = new User({ username, password: hashedPassword, name, phone, address, city, postalCode, state });

    // Save the user
    await user.save();

    // Manually log in the user after successful registration
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during login after registration', error: err.message });
      }

      // Issue a JWT token upon successful registration and login
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

      res.json({ message: 'Registration and login successful', user, token });
    });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});



// User Login
app.post('/api/login', passport.authenticate('local', { failureRedirect: '/login-failure' }), (req, res) => {
  const token = jwt.sign({ userId: req.user._id }, 'your-secret-key', { expiresIn: '1h' });

  res.json({ message: 'Login successful', user: req.user, token });
});

// Add a route for login failure
app.get('/login-failure', (req, res) => {
  res.status(401).json({ message: 'Login failed' });
});


// User Logout
app.get('/api/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});


// Retrieve user data by ID
app.get('/api/user/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user data', error: error.message });
  }
});

// Update User Information
app.patch('/api/user', verifyToken, async (req, res) => {
  try {
    const { name, address } = req.body;
    const userId = req.decoded.userId;

    const user = await User.findByIdAndUpdate(userId, { name, address }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User information updated', user });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user information', error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
