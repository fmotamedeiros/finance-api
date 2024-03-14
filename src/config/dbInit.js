const sequelize = require('./db');

async function initializeDatabase() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  try {
    await sequelize.sync({force: isDevelopment});
    console.log(`Database synchronized${isDevelopment ? ' (dev)' : ''}.`);
  } catch (error) {
    console.error('Failed to synchronize database:', error);
    throw error;
  }
}

module.exports = initializeDatabase;
