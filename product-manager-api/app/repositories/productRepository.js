'use strict';

const { products } = require('../models/productsModel');
const sequelize = require('../../config/databaseConfiguration');

/**
 * Allowed Filters to be used on listing
 */
const allowedFilterFields = ['id', 'price', 'name', 'void_at', 'manufactured_at', 'is_perishable'];
const allowedOrderingDirections = ['ASC', 'DESC'];

/**
 * Find product with given id
 */
module.exports.findById = async (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await products.findByPk(productId);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * List and filter products
 */
module.exports.list = async (queryOffset, queryLimit, orderByField, orderByDirection) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!allowedFilterFields.includes(orderByField)) orderByField = 'id';
            if(!allowedOrderingDirections.includes(orderByDirection)) orderByDirection = 'ASC';
            if(isNaN((parseInt(queryOffset))) || queryOffset < 0) queryOffset = 0;
            if(isNaN((parseInt(queryLimit))) || queryLimit < 0) queryLimit = 10;

            let result = await products.findAndCountAll({
                offset: queryOffset,
                limit: queryLimit,
                order: [
                    [orderByField, orderByDirection]
                ]
            });
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
}

/**
 * Find product with given id and update it's data
 */
module.exports.create = async (productName, productPrice, isPerishable, voidAt, manufacturedAt) => {
    return new Promise(async (resolve, reject) => {
        const transactionMethod = await sequelize.transaction();

        try {
            let result = await products.create(
                {
                    name : productName,
                    price : productPrice,
                    is_perishable : isPerishable,
                    void_at : (isPerishable && voidAt)? voidAt : null,
                    manufactured_at : manufacturedAt,
                },
                {
                    transaction: transactionMethod
                },
            );
            await transactionMethod.commit();
            resolve(result);
        } catch (e) {
            await transactionMethod.rollback();
            reject(e);
        }
    });
}

/**
 * Find product with given id and update it's data
 */
module.exports.update = async (productId, name, price, isPerishable, voidAt, manufacturedAt) => {
    return new Promise(async (resolve, reject) => {
        const transactionMethod = await sequelize.transaction();

        try {
            let result = await products.update(
                {
                    name : name,
                    price : price,
                    is_perishable : isPerishable,
                    void_at : (isPerishable && voidAt)? voidAt : null,
                    manufactured_at : manufacturedAt,
                },
                {
                    where : {
                        id : productId
                    },
                    transaction: transactionMethod,
                    omitNull: false
                },
            );
            await transactionMethod.commit();
            resolve(result);
        } catch (e) {
            await transactionMethod.rollback();
            reject(e);
        }
    });
}

/**
 * Find product with given id and remove it
 */
module.exports.delete = async (productId) => {
    return new Promise(async (resolve, reject) => {
        const transactionMethod = await sequelize.transaction();

        try {
            let result = await products.destroy({
                where: {
                    id: productId
                },
                transaction: transactionMethod
            });
            await transactionMethod.commit();
            resolve(result);
        } catch (e) {
            await transactionMethod.rollback();
            reject(e);
        }
    });
}