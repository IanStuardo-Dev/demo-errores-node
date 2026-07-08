class GetAllProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    return this.productRepository.findAll();
  }
}

module.exports = GetAllProductsUseCase;
