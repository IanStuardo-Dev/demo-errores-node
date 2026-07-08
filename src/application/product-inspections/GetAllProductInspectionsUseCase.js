class GetAllProductInspectionsUseCase {
  constructor(productInspectionRepository) {
    this.productInspectionRepository = productInspectionRepository;
  }

  async execute(productId) {
    return this.productInspectionRepository.findByProductId(productId);
  }
}

module.exports = GetAllProductInspectionsUseCase;
