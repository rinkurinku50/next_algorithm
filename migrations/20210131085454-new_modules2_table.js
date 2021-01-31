'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("modules", {
      mId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
          unique: true
      },
      modules: Sequelize.TEXT('long'),
      cId: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          references: {
              model: 'Courses',
              key: 'cId'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
  }, {
      timestamps: true
  });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("modules");
  }
};
