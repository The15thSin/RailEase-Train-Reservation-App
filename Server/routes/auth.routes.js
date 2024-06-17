const express = require('express');
const router = express.Router();
const {loginHandler, registerHandler, forgotPassword, changePassword} = require('../controllers/auth.controllers')

router.post('/login', loginHandler);
router.post('/register', registerHandler);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);

module.exports = router