const NotFoundError = require('../../shared/errors/NotFoundError');

class DeleteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const product = await this.productRepository.delete(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }
}

module.exports = DeleteProductUseCase;
