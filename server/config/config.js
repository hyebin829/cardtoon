const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'petcommunity',
    host: '127.0.0.1',
    port: '3309',
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
