const express = require('express');
const { Op } = require('sequelize');

const router = express.Router();
const { Post, Image, User, Comment } = require('../models');

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

// router.get('/hotcardtoon', async(req,res,next)=>{
//   try{
// //like 테이블에서 일주일간의 postid 가져오기
//   }
//   catch(error){
//     console.error(error);
//     next(error);
//   }
// })

module.exports = router;
