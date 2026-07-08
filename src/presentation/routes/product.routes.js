const express = require('express');
const ProductController = require('../controllers/ProductController');
const JsonProductRepository = require('../../infrastructure/repositories/JsonProductRepository');
const CreateProductUseCase = require('../../application/use-cases/CreateProductUseCase');
const DeleteProductUseCase = require('../../application/use-cases/DeleteProductUseCase');
const GetAllProductsUseCase = require('../../application/use-cases/GetAllProductsUseCase');
const GetProductByIdUseCase = require('../../application/use-cases/GetProductByIdUseCase');
const UpdateProductUseCase = require('../../application/use-cases/UpdateProductUseCase');

const router = express.Router();

const productRepository = new JsonProductRepository();
const productController = new ProductController({
  createProductUseCase: new CreateProductUseCase(productRepository),
  deleteProductUseCase: new DeleteProductUseCase(productRepository),
  getAllProductsUseCase: new GetAllProductsUseCase(productRepository),
  getProductByIdUseCase: new GetProductByIdUseCase(productRepository),
  updateProductUseCase: new UpdateProductUseCase(productRepository)
});

router.get('/', productController.getProductById);
router.get('/:id', productController.getAllProducts);
router.post('/', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
