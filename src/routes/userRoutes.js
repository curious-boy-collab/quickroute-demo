const { QuickRoute } = require('quickroute');
const User = require('../models/User');

const userRoutes = QuickRoute.create({
  model: User,
  name: 'users',
  searchableFields: ['name', 'email'],
  allowedFields: ['name', 'email', 'role', 'status'],
  requiredFields: ['name', 'email'],
  sortableFields: ['name', 'createdAt', 'role']
});

module.exports = userRoutes;
