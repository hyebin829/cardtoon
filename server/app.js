const express = require('express');
const db = require('./models');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const cors = require('cors');
const passportConfig = require('./passport');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const path = require('path');

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log('db연결');
  })
  .catch(console.error);

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true, //다른 도메인에 쿠키를 전달할 수 있다.
  })
);
passportConfig();

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3065, () => {
  console.log('hello');
});
