const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('../models/index.js');
const router = express.Router();
const { Post, Image, User, Comment } = require('../models');
const db = require('../models/post.js');
const { QueryTypes } = require('sequelize');

router.get('/homeposts', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }

    const homeposts = await Post.findAll({
      where,
      limit: 5,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'ASC'],
      ],

      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'profileimagesrc'],
        },
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        { model: User, as: 'Likers', attributes: ['id'] },
      ],
    });
    console.log(req.query.lastId);
    res.status(200).json(homeposts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/myposts', async (req, res, next) => {
  try {
    const myposts = await Post.findAll({
      where: { UserId: parseInt(req.query.myId, 10) },
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'ASC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'profileimagesrc'],
        },
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        { model: User, as: 'Likers', attributes: ['id'] },
      ],
    });
    res.status(200).json(myposts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/hotcardtoon', async (req, res, next) => {
  try {
    //like 테이블에서 일주일간의 postid 가져오기
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const today = new Date(year, month, day + 1);
    const sevenDaysAgo = new Date(year, month, day - 7);
    const hotPost = await Post.findAll({
      where: {
        createdAt: { [Op.between]: [sevenDaysAgo, today] },
      },
      include: [{ model: User, as: 'Likers', attributes: ['id'] }],
    });
    const hotPostLikers = hotPost.map(x => x.dataValues.Likers);

    console.log(hotPostLikers);

    res.status(200).json(hotPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
