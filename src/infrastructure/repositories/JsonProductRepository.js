const fs = require('fs/promises');
const path = require('path');
const ProductRepository = require('../../domain/repositories/ProductRepository');
const Product = require('../../domain/entities/Product');

const productsPath = path.join(__dirname, '../data/products.json');

class JsonProductRepository extends ProductRepository {
  async readProducts() {
    const data = await fs.readFile(productsPath, 'utf-8');

    return JSON.parse(data);
  }

  async writeProducts(products) {
    await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
  }

  async findAll() {
    const products = await this.readProducts();

    return products.map((product) => new Product(product));
  }

  async findById(id) {
    const products = await this.readProducts();
    const product = products.find((item) => item.id === parseInt(id));

    return product ? new Product(product) : null;
  }

  async create(productData) {
    const products = await this.readProducts();
    const nextId = products.length ? Math.max(...products.map((product) => product.id)) + 1 : 1;

    const product = new Product({
      id: nextId,
      name: productData.name,
      price: productData.price,
      stock: productData.stock,
      category: productData.category
    });

    products.push(product);
    await this.writeProducts(products);

    return product;
  }

  async update(id, productData) {
    const products = await this.readProducts();
    const index = products.findIndex((product) => product.id === Number(id));

    if (index === -1) {
      return null;
    }

    const updatedProduct = new Product({
      ...products[index],
      ...productData,
      id: products[index].id
    });

    products[index] = updatedProduct;
    await this.writeProducts(products);

    return updatedProduct;
  }

  async delete(id) {
    const products = await this.readProducts();
    const product = products.find((item) => item.id === Number(id));

    if (!product) {
      return null;
    }

    const filteredProducts = products.filter((item) => item.id !== Number(id));

    await this.writeProducts(filteredProducts);

    return new Product(product);
  }
}

module.exports = JsonProductRepository;
