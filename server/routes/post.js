const express = require('express');
const router = express.Router();

const { Post } = require('../models');
const { isLoggedIn } = require('./middlewares');

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
      category: 'home',
      title: 'home',
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
