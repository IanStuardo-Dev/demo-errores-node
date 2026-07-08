const express = require('express');
const productRoutes = require('./presentation/routes/product.routes');
const errorMiddleware = require('./presentation/middlewares/error.middleware');

const app = express();

app.use(errorMiddleware);

app.use('/products', productRoutes);

module.exports = app;
