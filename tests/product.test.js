const request = require('supertest');
const fs = require('fs/promises');
const path = require('path');
const app = require('../src/app');

const productsPath = path.join(__dirname, '../src/infrastructure/products/products.json');

const initialProducts = [
  {
    id: 1,
    name: 'Keyboard',
    price: 25000,
    stock: 10,
    category: 'accessories'
  },
  {
    id: 2,
    name: 'Mouse',
    price: 15000,
    stock: 20,
    category: 'accessories'
  },
  {
    id: 3,
    name: 'Monitor',
    price: 180000,
    stock: 5,
    category: 'hardware'
  }
];

beforeEach(async () => {
  await fs.writeFile(productsPath, JSON.stringify(initialProducts, null, 2));
});

describe('Product API', () => {
  test('GET /products should return status 200', async () => {
    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
  });

  test('GET /products should return an array', async () => {
    const response = await request(app).get('/products');

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /products/:id should return an existing product', async () => {
    const response = await request(app).get('/products/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'Keyboard',
      price: 25000,
      stock: 10,
      category: 'accessories'
    });
  });

  test('GET /products/:id should return 404 when product does not exist', async () => {
    const response = await request(app).get('/products/999');

    expect(response.status).toBe(404);
  });

  test('POST /products should create a valid product and return 201', async () => {
    const product = {
      name: 'Webcam',
      price: 45000,
      stock: 7,
      category: 'accessories'
    };

    const response = await request(app).post('/products').send(product);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(product);
    expect(response.body.id).toBeDefined();
  });

  test('POST /products should return 400 when name is missing', async () => {
    const response = await request(app).post('/products').send({
      price: 45000,
      stock: 7,
      category: 'accessories'
    });

    expect(response.status).toBe(400);
  });

  test('POST /products should return 400 when price is negative', async () => {
    const response = await request(app).post('/products').send({
      name: 'Webcam',
      price: -45000,
      stock: 7,
      category: 'accessories'
    });

    expect(response.status).toBe(400);
  });

  test('POST /products should return 400 when stock is negative', async () => {
    const response = await request(app).post('/products').send({
      name: 'Webcam',
      price: 45000,
      stock: -7,
      category: 'accessories'
    });

    expect(response.status).toBe(400);
  });

  test('PATCH /products/:id should update only one field without deleting the others', async () => {
    const response = await request(app).patch('/products/1').send({
      stock: 15
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'Keyboard',
      price: 25000,
      stock: 15,
      category: 'accessories'
    });
  });

  test('PATCH /products/:id should return 404 when product does not exist', async () => {
    const response = await request(app).patch('/products/999').send({
      stock: 15
    });

    expect(response.status).toBe(404);
  });

  test('DELETE /products/:id should delete an existing product', async () => {
    const deleteResponse = await request(app).delete('/products/1');
    const getResponse = await request(app).get('/products/1');

    expect(deleteResponse.status).toBe(200);
    expect(getResponse.status).toBe(404);
  });

  test('DELETE /products/:id should return 404 when product does not exist', async () => {
    const response = await request(app).delete('/products/999');

    expect(response.status).toBe(404);
  });
});
