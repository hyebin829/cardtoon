const { DataTypes } = require('sequelize/dist');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      start: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      end: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      place: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  Post.associate = db => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  };
  return Post;
};
