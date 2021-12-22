const express = require('express');
const db = require('./models');
const userRouter = require('./routes/user');
const cors = require('cors');

const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('db연결');
  })
  .catch(console.error);

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3065, () => {
  console.log('hello');
});
