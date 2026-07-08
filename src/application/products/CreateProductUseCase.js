class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData) {
    return this.productRepository.create(productData);
  }
}

module.exports = CreateProductUseCase;
