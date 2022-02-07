const Product = require('../models/Product.model');

class ProductController {
    // Create
    createProduct = async (req, res) => {
        const existProduct = await Product.findOne({name: req.body.name});
        if(existProduct) return res.status(400).json({msg: 'Product already exists'});
        console.log(req.body.image);
        try {
            const newProduct = new Product({
                name: req.body.name,
                brand: req.body.brand,
                color: req.body.color,
                rom: req.body.rom,
                ram: req.body.ram,
                desc: req.body.desc,
                price: req.body.price,
                sale: req.body.sale,
                image: req.body.image,
            })
            await newProduct.save()
            res.status(200).json({msg: 'Success'});
        } catch (error) {
            res.status(400).json({msg: 'Error saving'});
        }
    }

    // Update
    updateProduct = async (req, res) => {
        try {
            const updateProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updateProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Delete
    deleteProduct = async (req, res) => {
        try {
            await Product.deleteOne({_id: req.params.id});
            res.status(200).json("Product has been deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // get product
    getProduct = async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // get all products
    getProducts = async (req, res, next) => {
        const query = req.query.new;
        const searchCategory = req.query.brand;
        try {
            let products;
            if(query){
                products = await Product.find().sort({_id: -1}).limit(5);
            }
            else if(searchCategory) {
                products = await Product.find({
                    brand: {
                        $in: [searchCategory]
                    }
                });
            }
            else {
                products = await Product.find();
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

module.exports = new ProductController();