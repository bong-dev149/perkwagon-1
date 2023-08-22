const { Sequelize } = require('sequelize');
require('dotenv/config');
const env = process.env.NODE_ENV || 'development';
// const config = require('/etc/secrets/config.json')[env];
const config = require('../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    // Set the timezone option
    timezone: '+05:30', // Example: Indian Standard Time (IST)
});

//const sequelize = new Sequelize('mysql://doadmin:AVNS_MNHtg4fuAOBWyfP4OAS@perkwagon-db-do-user-14449570-0.b.db.ondigitalocean.com:25060/defaultdb?ssl-mode=REQUIRED')

module.exports = sequelize;  
