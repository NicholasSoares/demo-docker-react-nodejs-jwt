'use strict';

/**
 * Allowed Filters to be used on listing
 */
const allowedFilterFields = ['id', 'price', 'name', 'void_at', 'manufactured_at', 'is_perishable'];
const allowedOrderingDirections = ['ASC', 'DESC'];

/**
 * Verify if query params for product listing are valid and correct if needed
 */
module.exports = [
    async (req, res, next) => {
        try{
            if(!allowedFilterFields.includes(req.query.field)) req.query.field = 'id';
            if(!allowedOrderingDirections.includes(req.query.direction)) req.query.direction = 'ASC';
            if(isNaN((parseInt(req.query.index))) || req.query.index < 0) req.query.index = 0;
            if(isNaN((parseInt(req.query.limit))) || req.query.limit < 0) req.query.limit = 10;
            return next();
        }
        catch (e){
            return next(e);
        }
    }
];
