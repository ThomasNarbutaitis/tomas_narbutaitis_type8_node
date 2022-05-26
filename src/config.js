require('dotenv').config();

const PORT = process.env.SERVER_PORT || 5000;
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
};

module.exports = {
  PORT,
  dbConfig,
};
