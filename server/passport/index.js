const passport = require('passport');
const local = require('./local');
const kakao = require('./kakao');
const { User } = require('../models');

module.exports = () => {
  //router에서 req.login 했을 경우
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
      });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
  kakao();
};
