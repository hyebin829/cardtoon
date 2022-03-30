const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const { User } = require('../models');
const dotenv = require('dotenv');

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_KEY,
        callbackURL: '/api/user/kakao/login/callback',
      },

      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile, accessToken, refreshToken);
        try {
          const exUser = await User.findOne({
            where: { email: profile.id },
          });
          if (exUser) {
            const userWithToken = {
              id: exUser.id,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };
            done(null, userWithToken);
          } else {
            let today = new Date();
            let hours = today.getHours();
            let seconds = today.getSeconds();
            let milliseconds = today.getMilliseconds();
            const newUser = await User.create({
              email: profile.id,
              nickname: `유저${hours}${seconds}${milliseconds}`,
              format: 'kakaologin',
              password: profile.id,
            });
            const newUserwithToken = {
              id: newUser.id,
              accessToken: accessToken,
              refreshToken: refreshToken,
            };
            done(null, newUserwithToken);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
