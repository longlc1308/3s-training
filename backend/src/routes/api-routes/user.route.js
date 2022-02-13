const express = require('express');
const route = express.Router();
const userController = require('../../controllers/User.controller');
const authController = require('../../controllers/Auth.controller');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../../middlewares/verifyToken')

route.post('/register', authController.register);
route.post('/login', authController.login);
route.put('/forgot-password', authController.forgotPassword);
route.put('/reset-password/:token', authController.resetPassword);
route.put('/:id', userController.editUser);
route.delete('/:id', userController.deleteUser);
route.get('/find/:id',verifyTokenAndAdmin, userController.getUser);
route.get('/', userController.getUsers)

module.exports = route;