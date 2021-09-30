'use strict';

const { param, validationResult } = require('express-validator');
const productRepository = require('../../repositories/productRepository');

/**
 * Verify if login form have all fields filled and valid
 */
module.exports = [
    param('id').isInt({ min:0}),
    async (req, res, next) => {
        try{
            if (!validationResult(req).isEmpty()) {
                return res.status(400).json({ errors: validationResult(req).array() });
            }

            if (! await productRepository.findById(req.params.id)){
                return res.sendStatus(404);
            }

            return next();
        }
        catch (e){
            return next(e);
        }
    }
];