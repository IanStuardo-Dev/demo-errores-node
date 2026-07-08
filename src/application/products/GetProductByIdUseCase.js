const NotFoundError = require('../../shared/errors/NotFoundError');

class GetProductByIdUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }
}

module.exports = GetProductByIdUseCase;
