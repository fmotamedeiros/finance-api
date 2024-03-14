if (process.env.NODE_ENV !== 'development') {
  require('dotenv').config();
}

const config = {
  nodeEnv: process.env.NODE_ENV,
  serverPort: process.env.SERVER_PORT,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbDialect: process.env.DB_DIALECT,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
};

module.exports = config;
