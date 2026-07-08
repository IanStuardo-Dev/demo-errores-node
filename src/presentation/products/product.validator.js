function validateProduct(product) {
  if (!product.name) {
    return 'Name is required';
  }

  if (product.price < 0) {
    return 'Price must be a positive number';
  }
  
  if (product.stock < 0) {
    return 'Stock must be a positive number';
  }

  return null;
}

module.exports = {
  validateProduct
};
