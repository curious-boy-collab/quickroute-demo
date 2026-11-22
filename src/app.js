const express = require('express');
const path = require('path');
const { errorHandler } = require('quickroute');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());

// Serve static UI from public/
app.use(express.static(path.join(__dirname, '..', 'public')));

// Health Check Endpoint (Required for Render and monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'QuickRoute E-Commerce Demo API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root information endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'QuickRoute Demo E-Commerce API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders'
    },
    documentation: 'https://github.com/nitinjaiswal/quickroute-demo'
  });
});

// Mount QuickRoute generated CRUD APIs
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Centralized Error Handler powered by QuickRoute
app.use(errorHandler);

module.exports = app;
