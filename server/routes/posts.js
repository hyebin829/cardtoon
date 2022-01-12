const express = require('express');

const router = express.Router();
const { Post } = require('../models');

router.get('/homeposts', async (req, res, next) => {
  try {
    const homeposts = await Post.findAll({});
    console.log(homeposts);
    res.status(200).json(homeposts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
