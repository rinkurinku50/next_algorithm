'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("login_auth", {
      id: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          unique: true
      },
      email: Sequelize.STRING(300),
      password: Sequelize.STRING(300)

  });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("login_auth");
  }
};
