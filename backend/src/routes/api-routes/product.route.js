const express = require('express');
const route = express.Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../../middlewares/verifyToken');
const productController = require('../../controllers/Product.controller');
const upload = require('../../middlewares/multer');


route.post('/', upload.fields([]), productController.createProduct);
route.put('/:id', verifyTokenAndAdmin, productController.updateProduct);
route.delete('/:id', verifyTokenAndAdmin, productController.deleteProduct);
route.get('/find/:id', productController.getProduct);
route.get('/', productController.getProducts);


module.exports = route;