require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[QuickRoute Demo] Server running on port ${PORT}`);
    console.log(`[QuickRoute Demo] Health check available at http://localhost:${PORT}/health`);
  });
}

startServer();
