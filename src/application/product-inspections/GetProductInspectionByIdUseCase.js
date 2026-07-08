const NotFoundError = require('../../shared/errors/NotFoundError');

class GetProductInspectionByIdUseCase {
  constructor(productInspectionRepository) {
    this.productInspectionRepository = productInspectionRepository;
  }

  async execute(productId, id) {
    const inspection = await this.productInspectionRepository.findById(productId, id);

    if (!inspection) {
      throw new NotFoundError('Product inspection not found');
    }

    return inspection;
  }
}

module.exports = GetProductInspectionByIdUseCase;
