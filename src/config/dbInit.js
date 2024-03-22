const sequelize = require('./db');
const logger = require('./logger');

async function initializeDatabase() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  try {
    await sequelize.sync();
    logger.info(`Database synchronized${isDevelopment ? ' (dev)' : ''}.`);
  } catch (error) {
    logger.error(`Failed to synchronize database: ${error}.`);
    throw error;
  }
}

module.exports = initializeDatabase;
