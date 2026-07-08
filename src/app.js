const express = require('express');
const productRoutes = require('./presentation/products/product.routes');
const errorMiddleware = require('./presentation/middlewares/error.middleware');

const app = express();

app.use(express.json());

app.use('/products', productRoutes);


app.use(errorMiddleware);

module.exports = app;
