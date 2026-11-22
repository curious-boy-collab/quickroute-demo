const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce-demo';
  try {
    await mongoose.connect(uri);
    console.log(`[QuickRoute Demo] MongoDB Connected successfully`);
  } catch (error) {
    console.error(`[QuickRoute Demo] MongoDB Connection Error: ${error.message}`);
    // If running in development without MongoDB Atlas, log warning instead of crashing immediately
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

module.exports = connectDB;
