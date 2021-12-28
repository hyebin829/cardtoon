const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            //존재하는 이메일인지 검사
            where: { email },
          });
          //이메일이 존재하지 않는 경우
          if (!user) {
            done(null, false, { reason: '존재하지 않는 사용자입니다. ' }); //(서버에러, 성공/실패, 클라이언트에러)
          }
          const result = await bcrypt.compare(password, user.password); //비밀번호 일치하는지 검사
          //로그인 성공
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
