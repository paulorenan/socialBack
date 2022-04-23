module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'User',
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

  Follower.associate = (models) => {
    Follower.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Follower.belongsTo(models.User, {
      as: 'follower',
      foreignKey: 'followerId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return Follower;
}