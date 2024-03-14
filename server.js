require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/api/routes/userRoutes');
const authRoutes = require('./src/api/routes/authRoutes');
const sequelize = require('./src/config/db');

const app = express();
const port = process.env.PORT || 3000;

sequelize.sync({ force: true });

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', authRoutes);

app.listen(port, async () => {
  console.log(`Servidor rodando na porta ${port}`);
});

