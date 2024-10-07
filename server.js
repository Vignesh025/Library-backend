const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandler'); // Import the error handler
const cors = require('cors'); // Import CORS if needed

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS if your frontend is hosted separately
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const historyRoutes = require('./routes/historyRoutes');

// Mount routes
app.use('/api/auth', authRoutes);     // Authentication routes (sign up, login)
app.use('/api/books', bookRoutes);    // Book management routes (add, update, remove, view)
app.use('/api/members', memberRoutes); // Member management routes (view, update, delete, etc.)
app.use('/api/history', historyRoutes); // Borrowing/returning and viewing history

// Error handling middleware (should be at the end)
app.use(errorHandler); 

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
