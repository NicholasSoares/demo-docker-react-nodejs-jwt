'use strict';

const { body, param, validationResult } = require('express-validator');
const productRepository = require('../../repositories/productRepository');

/**
 * Verify if login form have all fields filled and valid
 */
module.exports = [
    body('name').notEmpty().trim().escape().isLength({ min: 1 }),
    body('price').notEmpty().isInt({ min:0}),
    body('is_perishable').toBoolean(),
    body('manufactured_at').notEmpty().isISO8601().toDate(),
    body('void_at').optional().isISO8601().toDate().custom((value, { req }) => {
        if(new Date(value) <= new Date(req.body.manufactured_at)) {
            throw new Error ('End date of void must be valid and after manufactured date');
        }

        return true;
    }),
    param('id').isInt({ min:0}),
    async (req, res, next) => {
        try{
            if (!validationResult(req).isEmpty()) {
                return res.status(400).json({ errors: validationResult(req).array() });
            }

            if (req.body.is_perishable && !req.body.void_at) {
                return res.status(400).json(
                    {
                        errors : [{
                            "msg": "Invalid value",
                            "param": "void_at",
                            "location": "body"
                        }]
                    }
                );
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
