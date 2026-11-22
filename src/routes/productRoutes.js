const { QuickRoute } = require('quickroute');
const Product = require('../models/Product');

const productRoutes = QuickRoute.create({
  model: Product,
  name: 'products',
  searchableFields: ['name', 'category', 'description'],
  allowedFields: ['name', 'description', 'category', 'price', 'stock'],
  requiredFields: ['name', 'category', 'price'],
  sortableFields: ['name', 'price', 'stock', 'createdAt']
});

module.exports = productRoutes;
