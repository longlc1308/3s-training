const Cart = require('../models/Cart.model');

class CartController {
    // create
    addItem = async (req, res) => {
        const userId = req.body.userId;
        const productId = req.body.productId;
        try {
            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                const newCart = await new Cart({
                    user: userId,
                    products: [
                        {
                            product: productId,
                            quantity: 1,
                        }
                    ]
                });

                await newCart.save();
                return res.status(200).json(newCart);
            }
            let isExisted = false;
            for (let i in cart.products) {
                if (cart.products[i].product === productId) {
                    isExisted = true;
                    break;
                }
            }
            if (isExisted) {
                await cart.products.map(async (p) => {
                    if (p.product === productId) {
                        p.quantity += 1
                    }
                })
            }
            if (!isExisted) {
                await cart.products.push({
                    product: productId,
                    quantity: 1
                })
            }
            await cart.save();
            return res.status(200).json(cart);

        } catch (error) {
            return res.status(500).json(error);
        }
    }
    //remove item
    removeItem = async (req, res) => {
        const userId = req.body.userId;
        const productId = req.body.productId;
        try {
            const cart = await Cart.findOne({ user: userId });
            cart.product.filter((p) => {
                return p.product !== productId;
            })
            await cart.save();
            return res.status(200).json(cart);

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    // delete
    deleteCart = async (req, res) => {
        try {
            await Cart.findByIdAndDelete(req.params.id);
            return res.status(200).json("Cart has been deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    // get user cart
    getUserCart = async (req, res) => {
        try {
            const cart = await Cart.findOne({ userId: req.params.userId });
            return res.status(200).json(cart)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new CartController();