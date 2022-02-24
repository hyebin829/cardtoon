const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const multer = require('multer');
const path = require('path');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.patch(
  '/profileimage',
  isLoggedIn,
  upload.single('image'),
  async (req, res) => {
    console.log(req.file.filename);
    try {
      await User.update(
        {
          profileimagesrc: req.file.filename,
        },
        { where: { id: req.user.id } }
      );
      res.status(200).json({ profileimagesrc: req.file.filename });
    } catch (error) {
      console.error(error);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          { model: User, as: 'Followings', attributes: ['id'] },
          { model: User, as: 'Followers', attributes: ['id'] },
        ],
      });
      res.status(200).json(userWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    console.log(req);
    const userProfileWithoutPassword = await User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Post,
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        },
      ],
    });
    if (userProfileWithoutPassword) {
      res.status(200).json(userProfileWithoutPassword);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  //(서버에러,성공객체,정보)
  passport.authenticate('local', (err, user, info) => {
    //서버에러가 발생했을 경우
    if (err) {
      console.error(err);
      return next(err);
    }
    //클라이언트 에러가 발생했을 경우
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginErr => {
      //passport의 로그인 처리에서 에러가 발생할 경우
      if (loginErr) {
        return next(loginErr);
      }
      const userInfoWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
          },
          { model: User, as: 'Followings' },
          { model: User, as: 'Followers' },
        ],
      });
      return res.status(200).json(userInfoWithoutPassword);
    });
  })(req, res, next);
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('logoutDone');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    const exNickname = await User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    });
    if (exNickname) {
      return res.status(403).send('이미 사용중인 닉네임입니다.');
    }
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
