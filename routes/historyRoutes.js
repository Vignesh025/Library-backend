const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/HistoryController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Routes for borrowing, returning, and viewing history
router.post('/borrow/:id', auth, roleCheck('MEMBER'), HistoryController.borrowBook); // Borrow a book (Member only)
router.post('/return/:id', auth, roleCheck('MEMBER'), HistoryController.returnBook); // Return a book (Member only)
router.get('/view', auth, HistoryController.viewHistory); // View history (Authenticated users)

module.exports = router;