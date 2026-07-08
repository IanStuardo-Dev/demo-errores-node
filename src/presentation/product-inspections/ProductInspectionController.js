const { validateProductInspection } = require('./product-inspection.validator');

class ProductInspectionController {
  constructor({
    createProductInspectionUseCase,
    deleteProductInspectionUseCase,
    getAllProductInspectionsUseCase,
    getProductInspectionByIdUseCase,
    updateProductInspectionUseCase
  }) {
    this.createProductInspectionUseCase = createProductInspectionUseCase;
    this.deleteProductInspectionUseCase = deleteProductInspectionUseCase;
    this.getAllProductInspectionsUseCase = getAllProductInspectionsUseCase;
    this.getProductInspectionByIdUseCase = getProductInspectionByIdUseCase;
    this.updateProductInspectionUseCase = updateProductInspectionUseCase;

    this.getAllProductInspections = this.getAllProductInspections.bind(this);
    this.getProductInspectionById = this.getProductInspectionById.bind(this);
    this.createProductInspection = this.createProductInspection.bind(this);
    this.updateProductInspection = this.updateProductInspection.bind(this);
    this.deleteProductInspection = this.deleteProductInspection.bind(this);
  }

  async getAllProductInspections(req, res, next) {
    try {
      const inspections = await this.getAllProductInspectionsUseCase.execute(req.params.productId);

      res.status(200).json(inspections);
    } catch (error) {
      next(error);
    }
  }

  async getProductInspectionById(req, res, next) {
    try {
      const inspection = await this.getProductInspectionByIdUseCase.execute(
        req.params.productId,
        req.params.inspectionId
      );

      res.status(200).json(inspection);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async createProductInspection(req, res, next) {
    try {
      const validationError = validateProductInspection(req.body);

      if (validationError) {
        return res.status(400).json({ message: validationError });
      }

      const inspection = await this.createProductInspectionUseCase.execute(req.params.productId, req.body);

      res.status(200).json(inspection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateProductInspection(req, res, next) {
    try {
      const inspection = await this.updateProductInspectionUseCase.execute(
        req.params.productId,
        req.params.inspectionId,
        req.body
      );

      res.status(200).json(inspection);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async deleteProductInspection(req, res, next) {
    try {
      const inspection = await this.deleteProductInspectionUseCase.execute(
        req.params.productId,
        req.params.inspectionId
      );

      res.status(200).json(inspection);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = ProductInspectionController;
