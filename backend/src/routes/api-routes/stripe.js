const express = require('express');
const route = express.Router();
const stripeController = require('../../controllers/Stripe.controller')

route.post('/', stripeController.createPayment)

module.exports = route;