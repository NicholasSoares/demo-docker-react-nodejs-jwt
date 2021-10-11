'use strict';

const express = require('express');
const router = express.Router();

/**
 * Routes controllers imports
 */
const {listProducts, getProductDetails, createProduct, removeProduct, updateProduct} = require('../controllers/productController');

/**
 * Middlewares imports
 */
const userTokenValidator = require('../middlewares/validators/userTokenValidator');
const productListValidator = require('../middlewares/validators/productListValidator');
const productCreateValidator = require('../middlewares/validators/productCreateValidator');
const productDeleteValidator = require('../middlewares/validators/productDeleteValidator');
const productUpdateValidator = require('../middlewares/validators/productUpdateValidator');

/**
 * Routes definitions to be exported
 */
router.get('/', userTokenValidator, productListValidator, listProducts);
router.get('/:id', userTokenValidator, getProductDetails);
router.post('/', userTokenValidator, productCreateValidator, createProduct);
router.patch('/:id', userTokenValidator, productUpdateValidator,updateProduct);
router.delete('/:id', userTokenValidator, productDeleteValidator ,removeProduct);

module.exports = router;
