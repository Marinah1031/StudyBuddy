const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/register', userController.register);

// Add more routes as needed

module.exports = router;
