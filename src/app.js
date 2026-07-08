const express = require('express');
const productRoutes = require('./presentation/routes/product.routes');
const errorMiddleware = require('./presentation/middlewares/error.middleware');

const app = express();

app.use(express.json());

app.use('/products', productRoutes);


app.use(errorMiddleware);

module.exports = app;
