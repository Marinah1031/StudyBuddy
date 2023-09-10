const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes'); // Import your user routes

// Middleware and other configurations

// Use the user routes
app.use('/api/users', userRoutes);

// Start your server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
