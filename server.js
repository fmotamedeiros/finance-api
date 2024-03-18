const express = require('express');
const cors = require('cors');
const initializeDatabase = require('./src/config/dbInit');
const userRoutes = require('./src/api/routes/userRoutes');
const accountRoutes = require('./src/api/routes/accountRoutes');
const categoryRoutes = require('./src/api/routes/categoryRoutes');
const authRoutes = require('./src/api/routes/authRoutes');
const {serverPort} = require('./src/config/config');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);
app.use('/api', accountRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authRoutes);

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(
      serverPort,
      () => console.log(`Server running on port ${serverPort}`),
    );
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

startServer();
