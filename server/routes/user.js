const express = require('express');
const router = express.Router();

const { User } = require('../models');

router.post('/', async (req, res) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    await User.create({
      email: req.body.email,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
