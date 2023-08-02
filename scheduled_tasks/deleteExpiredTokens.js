// scripts/deleteExpiredTokens.js

const BlockedToken = require('../models/BlockedToken');
const { Op } = require('sequelize');
const schedule = require('node-schedule');

// Function to delete expired tokens
const deleteExpiredTokens = async () => {
    try {
        const currentTime = Date.now();

        // Find and delete expired tokens
        await BlockedToken.destroy({
            where: {
                expiresAt: { [Op.lt]: currentTime },
            },
        });

        console.log('Expired tokens deleted successfully.');
    } catch (error) {
        console.log('Error deleting expired tokens');
    }
};

// Schedule the deletion process to run once a day (e.g., at midnight)
const deletionJob = schedule.scheduleJob('0 0 * * *', () => {
    deleteExpiredTokens();
});

module.exports = deleteExpiredTokens;