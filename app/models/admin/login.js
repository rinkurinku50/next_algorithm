const Sequelize = require('sequelize');
const sequelize = require('../connection');


const Login = sequelize.define('login_auth', {
    id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    email: Sequelize.STRING(300),
    password: Sequelize.STRING(300)
},{
    tableName:'login_auth',
    freezeTableName: true , 
    timestamps: false
},

);


module.exports = Login;