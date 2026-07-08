const NotFoundError = require('../../shared/errors/NotFoundError');

class UpdateProductInspectionUseCase {
  constructor(productInspectionRepository) {
    this.productInspectionRepository = productInspectionRepository;
  }

  async execute(productId, id, inspectionData) {
    const inspection = await this.productInspectionRepository.update(productId, id, inspectionData);

    if (!inspection) {
      throw new NotFoundError('Product inspection not found');
    }

    return inspection;
  }
}

module.exports = UpdateProductInspectionUseCase;
