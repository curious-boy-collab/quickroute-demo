const { QuickRoute } = require('quickroute');
const Order = require('../models/Order');

const orderRoutes = QuickRoute.create({
  model: Order,
  name: 'orders',
  searchableFields: ['customerName', 'customerEmail'],
  allowedFields: ['customerName', 'customerEmail', 'totalAmount', 'status', 'items'],
  requiredFields: ['customerName', 'customerEmail', 'totalAmount'],
  sortableFields: ['totalAmount', 'status', 'createdAt']
});

module.exports = orderRoutes;
