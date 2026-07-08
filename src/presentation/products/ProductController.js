const { validateProduct } = require('./product.validator');

class ProductController {
  constructor({
    createProductUseCase,
    deleteProductUseCase,
    getAllProductsUseCase,
    getProductByIdUseCase,
    updateProductUseCase
  }) {
    this.createProductUseCase = createProductUseCase;
    this.deleteProductUseCase = deleteProductUseCase;
    this.getAllProductsUseCase = getAllProductsUseCase;
    this.getProductByIdUseCase = getProductByIdUseCase;
    this.updateProductUseCase = updateProductUseCase;

    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  async getAllProducts(req, res, next) {
    try {
      const products = await this.getAllProductsUseCase.execute();

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const product = await this.getProductByIdUseCase.execute(req.params.id);

      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async createProduct(req, res, next) {
    try {
      const validationError = validateProduct(req.body);

      if (validationError) {
        return res.status(400).json({ message: validationError });
      }

      const product = await this.createProductUseCase.execute(req.body);

      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateProduct(req, res, next) {
    try {
      const product = await this.updateProductUseCase.execute(req.params.id, req.body);

      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const product = await this.deleteProductUseCase.execute(req.params.id);

      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = ProductController;
