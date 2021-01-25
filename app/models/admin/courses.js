const Sequelize = require('sequelize');
const sequelize = require('../connection');


const Courses = sequelize.define('Courses', {
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
    cimage: Sequelize.STRING(300)
});
Courses.associate = (models) => {
    Courses.hasOne(models.Modules, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        as: 'modules',
        foreginKey: 'cId'
    })
}

module.exports = Courses;