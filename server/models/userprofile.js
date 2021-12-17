const { DataTypes } = require('sequelize/dist');

module.exports = (sequelize, DataTypes) => {
  const Userprofile = sequelize.define(
    'Userprofile',
    {
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      birth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gu: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      dong: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  Userprofile.associate = db => {
    db.Userprofile.belongsTo(db.User);
    db.Userprofile.hasOne(db.Image);
  };
  return Userprofile;
};
