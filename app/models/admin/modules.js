const Sequelize = require('sequelize');
const sequelize = require('../connection');




const Modules = sequelize.define('Modules', {
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
    }
});
Modules.associate = (models) => {
    Modules.belongsTo(models.Courses, {
        as: 'courses',
        foreignKey: 'cId'
    });
}

module.exports = Modules;