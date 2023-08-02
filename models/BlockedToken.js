const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const BlockedToken = sequelize.define('BlockedToken', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tokenExpiry: {
        type: DataTypes.DATE,
        allowNull: false,
    },

}, {
    tableName: 'blockedtoken'
});


module.exports = BlockedToken;