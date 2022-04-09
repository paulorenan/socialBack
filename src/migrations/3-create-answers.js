'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: { type: Sequelize.TEXT, allowNull: false},
      userId: { 
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      postId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Posts',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Answers');
  }
};
