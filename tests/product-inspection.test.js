const request = require('supertest');
const fs = require('fs/promises');
const path = require('path');
const app = require('../src/app');

const productsPath = path.join(__dirname, '../src/infrastructure/products/products.json');
const inspectionsPath = path.join(__dirname, '../src/infrastructure/product-inspections/product-inspections.json');

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
  }
];

const initialInspections = [
  {
    id: 1,
    productId: 1,
    inspector: 'Ana Quality',
    score: 92,
    status: 'approved',
    notes: 'Packaging and switches are consistent'
  },
  {
    id: 2,
    productId: 1,
    inspector: 'Luis QA',
    score: 64,
    status: 'rework',
    notes: 'One stabilizer needs adjustment'
  },
  {
    id: 3,
    productId: 2,
    inspector: 'Mia Control',
    score: 88,
    status: 'approved',
    notes: 'Sensor calibration looks good'
  }
];

beforeEach(async () => {
  await fs.writeFile(productsPath, JSON.stringify(initialProducts, null, 2));
  await fs.writeFile(inspectionsPath, JSON.stringify(initialInspections, null, 2));
});

describe('Product Inspection API', () => {
  test('GET /products/:productId/inspections should return status 200', async () => {
    const response = await request(app).get('/products/1/inspections');

    expect(response.status).toBe(200);
  });

  test('GET /products/:productId/inspections should return only inspections for that product', async () => {
    const response = await request(app).get('/products/1/inspections');

    expect(response.body).toHaveLength(2);
    expect(response.body.every((inspection) => inspection.productId === 1)).toBe(true);
  });

  test('GET /products/:productId/inspections/:inspectionId should return an existing inspection', async () => {
    const response = await request(app).get('/products/1/inspections/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      productId: 1,
      inspector: 'Ana Quality',
      score: 92,
      status: 'approved',
      notes: 'Packaging and switches are consistent'
    });
  });

  test('GET /products/:productId/inspections/:inspectionId should return 404 for an inspection from another product', async () => {
    const response = await request(app).get('/products/2/inspections/1');

    expect(response.status).toBe(404);
  });

  test('POST /products/:productId/inspections should create a valid inspection and return 201', async () => {
    const inspection = {
      inspector: 'Nora Audit',
      score: 77,
      status: 'rework',
      notes: 'Keycaps need a second visual check'
    };

    const response = await request(app).post('/products/1/inspections').send(inspection);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      ...inspection,
      productId: 1
    });
    expect(response.body.id).toBeDefined();
  });

  test('POST /products/:productId/inspections should return 400 when inspector is missing', async () => {
    const response = await request(app).post('/products/1/inspections').send({
      score: 77,
      status: 'rework',
      notes: 'Keycaps need a second visual check'
    });

    expect(response.status).toBe(400);
  });

  test('POST /products/:productId/inspections should return 400 when score is above 100', async () => {
    const response = await request(app).post('/products/1/inspections').send({
      inspector: 'Nora Audit',
      score: 120,
      status: 'approved',
      notes: 'Suspiciously perfect batch'
    });

    expect(response.status).toBe(400);
  });

  test('PATCH /products/:productId/inspections/:inspectionId should update only one field without deleting the others', async () => {
    const response = await request(app).patch('/products/1/inspections/1').send({
      status: 'rework'
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      productId: 1,
      inspector: 'Ana Quality',
      score: 92,
      status: 'rework',
      notes: 'Packaging and switches are consistent'
    });
  });

  test('PATCH /products/:productId/inspections/:inspectionId should return 404 when inspection does not exist', async () => {
    const response = await request(app).patch('/products/1/inspections/999').send({
      status: 'rejected'
    });

    expect(response.status).toBe(404);
  });

  test('DELETE /products/:productId/inspections/:inspectionId should delete an existing inspection', async () => {
    const deleteResponse = await request(app).delete('/products/1/inspections/1');
    const getResponse = await request(app).get('/products/1/inspections/1');

    expect(deleteResponse.status).toBe(200);
    expect(getResponse.status).toBe(404);
  });

  test('DELETE /products/:productId/inspections/:inspectionId should return 404 when inspection does not exist', async () => {
    const response = await request(app).delete('/products/1/inspections/999');

    expect(response.status).toBe(404);
  });
});
