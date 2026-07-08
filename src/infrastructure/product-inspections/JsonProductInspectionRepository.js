const fs = require('fs/promises');
const path = require('path');
const ProductInspectionRepository = require('../../domain/product-inspections/ProductInspectionRepository');
const ProductInspection = require('../../domain/product-inspections/ProductInspection');

const inspectionsPath = path.join(__dirname, 'product-inspections.json');

class JsonProductInspectionRepository extends ProductInspectionRepository {
  async readInspections() {
    const data = await fs.readFile(inspectionsPath, 'utf-8');

    return JSON.parse(data);
  }

  async writeInspections(inspections) {
    await fs.writeFile(inspectionsPath, JSON.stringify(inspections, null, 2));
  }

  async findByProductId(productId) {
    const inspections = await this.readInspections();

    return inspections.map((inspection) => new ProductInspection(inspection));
  }

  async findById(productId, id) {
    const inspections = await this.readInspections();
    const inspection = inspections.find(
      (item) => item.productId === Number(productId) && item.id === Number(id)
    );

    return inspection ? new ProductInspection(inspection) : null;
  }

  async create(productId, inspectionData) {
    const inspections = await this.readInspections();
    const nextId = inspections.length ? Math.max(...inspections.map((inspection) => inspection.id)) + 1 : 1;

    const inspection = new ProductInspection({
      id: nextId,
      productId: Number(productId),
      inspector: inspectionData.inspector,
      score: inspectionData.score,
      status: inspectionData.status,
      notes: inspectionData.notes
    });

    inspections.push(inspection);
    await this.writeInspections(inspections);

    return inspection;
  }

  async update(productId, id, inspectionData) {
    const inspections = await this.readInspections();
    const index = inspections.findIndex(
      (inspection) => inspection.productId === Number(productId) && inspection.id === Number(id)
    );

    if (index === -1) {
      return null;
    }

    const updatedInspection = new ProductInspection({
      id: Number(id),
      productId: Number(productId),
      inspector: inspectionData.inspector,
      score: inspectionData.score,
      status: inspectionData.status,
      notes: inspectionData.notes
    });

    inspections[index] = updatedInspection;
    await this.writeInspections(inspections);

    return updatedInspection;
  }

  async delete(productId, id) {
    const inspections = await this.readInspections();
    const inspection = inspections.find(
      (item) => item.productId === Number(productId) && item.id === Number(id)
    );

    if (!inspection) {
      return null;
    }

    await this.writeInspections(inspections);

    return new ProductInspection(inspection);
  }
}

module.exports = JsonProductInspectionRepository;
