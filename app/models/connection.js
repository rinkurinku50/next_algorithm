const Sequelize = require('sequelize');

module.exports = new Sequelize("next_algorithm", 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: 0
});