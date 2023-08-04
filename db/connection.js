const { Sequelize } = require('sequelize');
require('dotenv/config');
const env = process.env.NODE_ENV || 'development';
const config = require('/etc/secrets/config.json')[env];
//const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
});

module.exports = sequelize;  
