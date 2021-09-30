'use strict';

const express = require('express');
const router = express.Router();

/**
 * Routes controllers imports
 */
const {getToken, removeToken} = require('../controllers/userController');

/**
 * Middlewares imports
 */
const userLoginRequestValidator = require('../middlewares/validators/userLoginRequestValidator');
const userTokenValidator = require('../middlewares/validators/userTokenValidator');

/**
 * Routes definitions to be exported
 */
router.post('/token', userLoginRequestValidator, getToken);
router.delete('/token', userTokenValidator, removeToken);

module.exports = router;
