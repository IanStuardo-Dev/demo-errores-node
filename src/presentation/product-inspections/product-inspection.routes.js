const express = require('express');
const ProductInspectionController = require('./ProductInspectionController');
const JsonProductInspectionRepository = require('../../infrastructure/product-inspections/JsonProductInspectionRepository');
const CreateProductInspectionUseCase = require('../../application/product-inspections/CreateProductInspectionUseCase');
const DeleteProductInspectionUseCase = require('../../application/product-inspections/DeleteProductInspectionUseCase');
const GetAllProductInspectionsUseCase = require('../../application/product-inspections/GetAllProductInspectionsUseCase');
const GetProductInspectionByIdUseCase = require('../../application/product-inspections/GetProductInspectionByIdUseCase');
const UpdateProductInspectionUseCase = require('../../application/product-inspections/UpdateProductInspectionUseCase');

const router = express.Router({ mergeParams: true });

const productInspectionRepository = new JsonProductInspectionRepository();
const productInspectionController = new ProductInspectionController({
  createProductInspectionUseCase: new CreateProductInspectionUseCase(productInspectionRepository),
  deleteProductInspectionUseCase: new DeleteProductInspectionUseCase(productInspectionRepository),
  getAllProductInspectionsUseCase: new GetAllProductInspectionsUseCase(productInspectionRepository),
  getProductInspectionByIdUseCase: new GetProductInspectionByIdUseCase(productInspectionRepository),
  updateProductInspectionUseCase: new UpdateProductInspectionUseCase(productInspectionRepository)
});

router.get('/', productInspectionController.getAllProductInspections);
router.get('/:inspectionId', productInspectionController.getProductInspectionById);
router.post('/', productInspectionController.createProductInspection);
router.patch('/:inspectionId', productInspectionController.updateProductInspection);
router.delete('/:inspectionId', productInspectionController.deleteProductInspection);

module.exports = router;
