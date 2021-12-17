const express = require('express');
const db = require('./models');

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('db연결');
  })
  .catch(console.error);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3065, () => {
  console.log('hello');
});
