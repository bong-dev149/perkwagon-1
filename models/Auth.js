const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Auth = sequelize.define('Auth', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeofuser: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    verified:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},{
    tableName: 'auth'
});


module.exports = Auth;
