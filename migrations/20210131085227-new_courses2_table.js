'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("courses", {
      cId: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          unique: true
      },
      cname: Sequelize.STRING(300),
      ccatagory: Sequelize.STRING(300),
      ctiming: Sequelize.STRING(300),
      batch: Sequelize.STRING(300),
      cdesc: Sequelize.TEXT('long'),
      cimage: Sequelize.STRING(300),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE

  }, {
      timestamps: true
  });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("courses");
  }
};
