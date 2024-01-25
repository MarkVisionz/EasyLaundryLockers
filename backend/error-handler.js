// error-handler.js
module.exports = (err, req, res, next) => {
    console.error(err.stack);
  
    // Handle specific errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: err.errors });
    }
  
    // Handle other errors
    return res.status(500).json({ error: 'Internal server error' });
  };
  