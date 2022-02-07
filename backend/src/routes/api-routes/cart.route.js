const express = require('express');
const route = express.Router();
const cartController = require('../../controllers/Cart.controller');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('../../middlewares/verifyToken');

route.post('/', verifyToken, cartController.addItem);
route.put('/:productId', verifyTokenAndAuthorization, cartController.removeItem);
route.delete('/:id', verifyTokenAndAuthorization, cartController.deleteCart);
route.get('/find/:userId', verifyTokenAndAuthorization, cartController.getUserCart)

module.exports = route;