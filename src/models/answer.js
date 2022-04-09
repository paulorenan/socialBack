module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Post',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Post.belongsTo(models.Post, {
      foreignKey: 'postId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };


  return Answer;
}