require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const sampleUsers = [
  { name: 'Nitin Jaiswal', email: 'nitin@example.com', role: 'admin', status: 'active' },
  { name: 'Aarav Sharma', email: 'aarav@example.com', role: 'customer', status: 'active' },
  { name: 'Priya Patel', email: 'priya@example.com', role: 'customer', status: 'active' },
  { name: 'Rahul Verma', email: 'rahul@example.com', role: 'vendor', status: 'active' }
];

const sampleProducts = [
  { name: 'Mechanical Keyboard RGB', description: 'Gateron Brown switches with hot-swappable PCB', category: 'Electronics', price: 89.99, stock: 45 },
  { name: 'Ergonomic Desk Chair', description: 'Breathable mesh back with adjustable lumbar support', category: 'Furniture', price: 249.99, stock: 18 },
  { name: 'Ultra-Wide 34-inch Monitor', description: '144Hz 1440p curved display with HDR400', category: 'Electronics', price: 429.5, stock: 12 },
  { name: 'Noise-Cancelling Headphones', description: 'Wireless Bluetooth 5.3 with 40-hour battery life', category: 'Audio', price: 179.0, stock: 30 },
  { name: 'Organic Cotton Hoodie', description: 'Heavyweight fleece unisex oversized hoodie', category: 'Apparel', price: 54.99, stock: 80 }
];

async function seedDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce-demo';
  console.log('[Seed] Connecting to MongoDB...');
  await mongoose.connect(uri);

  console.log('[Seed] Clearing existing collections...');
  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Order.deleteMany({})
  ]);

  console.log('[Seed] Inserting sample users...');
  const users = await User.insertMany(sampleUsers);

  console.log('[Seed] Inserting sample products...');
  const products = await Product.insertMany(sampleProducts);

  console.log('[Seed] Inserting sample orders...');
  const sampleOrders = [
    {
      customerName: users[1].name,
      customerEmail: users[1].email,
      totalAmount: 339.98,
      status: 'completed',
      items: [
        { productName: products[0].name, quantity: 1, unitPrice: products[0].price },
        { productName: products[1].name, quantity: 1, unitPrice: products[1].price }
      ]
    },
    {
      customerName: users[2].name,
      customerEmail: users[2].email,
      totalAmount: 179.0,
      status: 'processing',
      items: [
        { productName: products[3].name, quantity: 1, unitPrice: products[3].price }
      ]
    }
  ];

  await Order.insertMany(sampleOrders);

  console.log(`[Seed] Success! Seeded ${users.length} users, ${products.length} products, and ${sampleOrders.length} orders.`);
  await mongoose.disconnect();
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error('[Seed] Error seeding database:', err.message);
  process.exit(1);
});
