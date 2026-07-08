const NotFoundError = require('../../shared/errors/NotFoundError');

class UpdateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, productData) {
    const product = await this.productRepository.update(id, productData);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }
}

module.exports = UpdateProductUseCase;
