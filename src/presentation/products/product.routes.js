const express = require('express');
const ProductController = require('./ProductController');
const productInspectionRoutes = require('../product-inspections/product-inspection.routes');
const JsonProductRepository = require('../../infrastructure/products/JsonProductRepository');
const CreateProductUseCase = require('../../application/products/CreateProductUseCase');
const DeleteProductUseCase = require('../../application/products/DeleteProductUseCase');
const GetAllProductsUseCase = require('../../application/products/GetAllProductsUseCase');
const GetProductByIdUseCase = require('../../application/products/GetProductByIdUseCase');
const UpdateProductUseCase = require('../../application/products/UpdateProductUseCase');

const router = express.Router();

const productRepository = new JsonProductRepository();
const productController = new ProductController({
  createProductUseCase: new CreateProductUseCase(productRepository),
  deleteProductUseCase: new DeleteProductUseCase(productRepository),
  getAllProductsUseCase: new GetAllProductsUseCase(productRepository),
  getProductByIdUseCase: new GetProductByIdUseCase(productRepository),
  updateProductUseCase: new UpdateProductUseCase(productRepository)
});

router.get('/', productController.getAllProducts);
router.use('/:productId/inspections', productInspectionRoutes);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
