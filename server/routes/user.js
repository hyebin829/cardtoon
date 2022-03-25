const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { QueryTypes } = require('sequelize');
const multer = require('multer');
const path = require('path');
const axios = require('axios');

const { User, Post, Image, Comment } = require('../models');
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
            attributes: ['id', 'UserId'],
          },
          { model: User, as: 'Followings', attributes: ['id'] },
          { model: User, as: 'Followers', attributes: ['id'] },
          { model: Image, attributes: ['src', 'id', 'UserId', 'PostId'] },
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

router.get('/favorites', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.query.userId },
      attributes: {
        exclude: ['password'],
      },
    });
    const favorites = await user.getFollowings({
      attributes: {
        exclude: ['password'],
      },
    });
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
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

router.get('/kakao/login', passport.authenticate('kakao'));

router.get(
  '/kakao/login/callback',
  passport.authenticate('kakao', {
    failureMessage: true,
    successRedirect: 'http://localhost:3001/',
    failureRedirect: 'http://localhost:3001/',
  })
);

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
    const exNickname = await User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    });
    if (exNickname) {
      return res.status(403).send('이미 사용중인 닉네임입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      nickname: req.body.nickname,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/logout', isLoggedIn, async (req, res) => {
  if (req.user.accessToken && req.user.refreshToken) {
    try {
      const LOGOUT_REDIRECT_URI = 'http://localhost:3065/user/kakao/logout';
      const REST_API_KEY = process.env.KAKAO_KEY;
      const logout = await axios({
        method: 'GET',
        url: `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`,
      });
    } catch (error) {
      console.error(error);
    }
  }
  req.logout();
  req.session.destroy();
  res.send('logoutDone');
});

router.get('/kakao/logout', async (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('http://localhost:3001');
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

router.delete('/account', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    const ACCESS_TOKEN = req.user.accessToken;
    if (user.format === 'kakaologin') {
      const deleteaccount = await axios({
        method: 'POST',
        url: 'https://kapi.kakao.com/v1/user/unlink',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
    }
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.');
    }
    await Post.destroy({
      where: { UserId: req.user.id },
    });
    await Comment.destroy({
      where: {
        UserId: req.user.id,
      },
    });

    await user.removeFollowers(req.user.id);
    await user.removeFollowings(req.user.id);

    await User.destroy({
      where: { id: req.user.id },
    });
    req.logout();
    req.session.destroy();
    res.send('deleteAccountDone');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
