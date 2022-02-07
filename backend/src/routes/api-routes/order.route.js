const express = require('express');
const route = express.Router();
const orderController = require('../../controllers/Order.controller');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../../middlewares/verifyToken');

route.post('/', verifyToken, orderController.createOrder);
route.put('/:id', verifyTokenAndAdmin, orderController.updateOrder);
route.delete('/:id', verifyTokenAndAdmin, orderController.deleteOrder);
route.get('/find/:userId', verifyTokenAndAuthorization, orderController.getUserOrders);
route.get('/', verifyTokenAndAdmin, orderController.getOrders);


module.exports = route;