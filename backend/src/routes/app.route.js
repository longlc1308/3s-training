const usersRoute = require('./api-routes/user.route');
const productsRoute = require('./api-routes/product.route');
const cartRoute = require('./api-routes/cart.route');
const orderRoute = require('./api-routes/order.route')

function route(app) {
    app.use('/api/users', usersRoute);
    app.use('/api/products', productsRoute);
    app.use('/api/carts', cartRoute);
    app.use('/api/orders', orderRoute)
}

module.exports = route;