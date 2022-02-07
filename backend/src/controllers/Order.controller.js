const Order = require('../models/Order.model');

class OrderController {
    // create
    createOrder =  async (req, res) => {
        const newOrder = new Order(req.body);
        try {
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // update
    updateOrder = async (req, res) => {
        try {
            const updateOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updateOrder);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // delete
    deleteOrder = async (req, res) => {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json("Order has been deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // get user oders
    getUserOrders = async (req, res) => {
        try {
            const oders = await Oder.find({userId: req.params.userId });
            res.status(200).json(oders)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // get all orders
    getOrders = async (req, res) => {
        try {
            const orders = await Oder.find();
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // get monthly income
    getIncome = async (req, res) => {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
        try {
            const income = await Order.aggreate([
                { $match: { createdAt: { $gte: previousMonth }}},
                { $project: {
                    month: { $month: "$createdAt"},
                    sales: "$amount"
                }},
                { $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }}
            ])
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new OrderController();