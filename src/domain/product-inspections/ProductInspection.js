class ProductInspection {
  constructor({ id, productId, inspector, score, status, notes }) {
    this.id = id;
    this.productId = productId;
    this.inspector = inspector;
    this.score = score;
    this.status = status;
    this.notes = notes;
  }
}

module.exports = ProductInspection;
