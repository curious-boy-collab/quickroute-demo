const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

describe('QuickRoute Demo E-Commerce API Integration Tests', () => {
  it('GET /health - should return 200 and healthy service status', async () => {
    const res = await request(app).get('/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
    assert.equal(res.body.service, 'QuickRoute E-Commerce Demo API');
    assert.ok(res.body.uptime >= 0);
  });

  it('GET / - should return metadata and available endpoints', async () => {
    const res = await request(app).get('/');
    assert.equal(res.status, 200);
    assert.equal(res.body.name, 'QuickRoute Demo E-Commerce API');
    assert.ok(res.body.endpoints.users);
    assert.ok(res.body.endpoints.products);
    assert.ok(res.body.endpoints.orders);
  });

  it('POST /api/users - should reject with 400 when required fields (name, email) are missing', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ role: 'admin' });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /Field 'name' is required/);
  });

  it('POST /api/products - should reject with 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Laptop' }); // category and price missing

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /Field 'category' is required/);
  });

  it('POST /api/orders - should reject with 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ customerName: 'John Doe' }); // customerEmail, totalAmount missing

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /Field 'customerEmail' is required/);
  });

  it('GET /api/users/:id - should reject invalid MongoDB ObjectId format with 400', async () => {
    const res = await request(app).get('/api/users/not-a-valid-mongo-id');
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, 'Invalid ID format');
  });

  it('GET /undefined-route - should return 404 for non-existent endpoint', async () => {
    const res = await request(app).get('/random-unknown-endpoint');
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /Cannot GET \/random-unknown-endpoint/);
  });
});
