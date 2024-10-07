const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Routes for books
router.post('/add', auth, roleCheck("LIBRARIAN"), BookController.addBook); // Add a new book (Librarian only)
router.put('/update/:id', auth, roleCheck('LIBRARIAN'), BookController.updateBook); // Update a book (Librarian only)
router.delete('/remove/:id', auth, roleCheck('LIBRARIAN'), BookController.removeBook); // Remove a book (Librarian only)
router.get('/view', auth, BookController.viewBooks); // View available books (Authenticated users)

module.exports = router;