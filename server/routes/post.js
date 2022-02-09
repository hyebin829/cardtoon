const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post } = require('../models');
const { isLoggedIn } = require('./middlewares');

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads폴더 생성');
  fs.mkdirSync('uploads');
}

router.post('/homepost', isLoggedIn, async (req, res) => {
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
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});

module.exports = router;
