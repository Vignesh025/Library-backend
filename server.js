const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandler'); 
const cors = require('cors'); 


dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors());

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const historyRoutes = require('./routes/historyRoutes');

app.get('/', (req, res) => {
  res.send('Welcome to the Library Management System API');
});
app.use('/api/auth', authRoutes);     // Authentication routes (sign up, login)
app.use('/api/books', bookRoutes);    // Book management routes (add, update, remove, view)
app.use('/api/members', memberRoutes); // Member management routes (view, update, delete, etc.)
app.use('/api/history', historyRoutes); // Borrowing/returning and viewing history

app.use(errorHandler); 

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
