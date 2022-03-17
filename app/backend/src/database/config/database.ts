require('dotenv').config();

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'TRYBE_FUTEBOL_CLUBE',
  host: process.env.DB_HOST,
  // Padrão do MYSQL 3306, no ambiente set está DB_PORT, o PORT este outra para rodar local sem ser no docker 
  port: process.env.DB_PORT,
  dialect: 'mysql',
};
