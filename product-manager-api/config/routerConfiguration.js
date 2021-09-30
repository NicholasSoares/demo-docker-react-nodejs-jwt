'use strict';

/**
 * Routes configuration imports
 */
const userRoutes =  require('../app/routes/userRoutes');
const productRoutes = require('../app/routes/productRoutes');

/**
 * router bindings configuration
 */
module.exports.routerConfiguration = (app) => {
    app.use('/user', userRoutes);
    app.use('/product', productRoutes);
};
