function validateProduct(product) {
  if (!product.name) {
    return 'Name is required';
  }

  return null;
}

module.exports = {
  validateProduct
};
