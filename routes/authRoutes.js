const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Routes for authentication (Sign-up and login)
router.post('/signup', AuthController.signup); // User sign-up (Librarian or Member)
router.post('/login', AuthController.login); // User login (with JWT generation)

module.exports = router;
