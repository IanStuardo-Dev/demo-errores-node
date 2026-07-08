class CreateProductInspectionUseCase {
  constructor(productInspectionRepository) {
    this.productInspectionRepository = productInspectionRepository;
  }

  async execute(productId, inspectionData) {
    return this.productInspectionRepository.create(productId, inspectionData);
  }
}

module.exports = CreateProductInspectionUseCase;
