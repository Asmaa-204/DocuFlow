const { Activity } = require('../models');

async function logActivity(userId, action, details = {}) {
    try {
        await Activity.create({
            userId,
            action,
            details,
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
}

module.exports = { logActivity };
