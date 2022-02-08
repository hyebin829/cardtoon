const express = require('express');
const { Op } = require('sequelize');

const router = express.Router();
const { Post, Image, User } = require('../models');

router.get('/homeposts', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }

    const homeposts = await Post.findAll({
      where,
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['id', 'email'],
        },
        { model: Image },
      ],
    });
    console.log(req.query.lastId);
    res.status(200).json(homeposts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
