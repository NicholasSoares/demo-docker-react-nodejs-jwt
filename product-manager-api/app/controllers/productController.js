'use strict';

const productRepository = require('../repositories/productRepository');

/**
 * List products with pagination
 */
module.exports.listProducts = async (req,res,next) => {
    try{
        let products = await productRepository.list(
            req.query.index,
            req.query.offset,
            req.query.field,
            req.query.direction
        );

        return res.status(200).json(
            { products: products.rows, totalProducts: products.count }
        );
    }
    catch(e){
        next(e);
    }
}

/**
 * Get a product details
 */
module.exports.getProductDetails = async (req,res,next) => {
    try{
        let productDetails = await productRepository.findById(req.params.id);
        return res.status(200).json(
            { product: productDetails }
        );
    }
    catch(e){
        next(e);
    }
}

/**
 * Create a product
 */
module.exports.createProduct = async (req,res,next) => {
    try{
        await productRepository.create(
            req.body.name,
            req.body.price,
            req.body.is_perishable,
            req.body.void_at,
            req.body.manufactured_at
        );
        res.sendStatus(200);
    }
    catch(e){
        next(e);
    }
}

/**
 * Update product info
 */
module.exports.updateProduct = async (req,res,next) => {
    try{
        await productRepository.update(
            req.params.id,
            req.body.name,
            req.body.price,
            req.body.is_perishable,
            req.body.void_at,
            req.body.manufactured_at
        );
        res.sendStatus(200);
    }
    catch(e){
        next(e);
    }
}

/**
 * Remove a product
 */
module.exports.removeProduct = async (req,res,next) => {
    try{
        await productRepository.delete(req.params.id);
        res.sendStatus(200);
    }
    catch(e){
        next(e);
    }
}