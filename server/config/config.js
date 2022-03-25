const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'petcommunity',
    host: 'db',
    port: '3306',
    dialect: 'mysql',
    timezone: '+09:00',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'petcommunity',
    host: 'db',
    dialect: 'mysql',
    timezone: '+09:00',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'petcommunity',
    host: 'db',
    dialect: 'mysql',
    timezone: '+09:00',
  },
};
