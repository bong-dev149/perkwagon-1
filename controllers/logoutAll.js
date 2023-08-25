// Purpose: Logout user from all devices
const BlockedToken = require('../models/BlockedToken');
const Auth = require('../models/Auth');
const tokenController = require('../reusable_module/tokenController');

const logoutAll = async (req, res) => {
    // console.log('logoutAll');
    try {
        if (req.error) {
            throw req.error;
        }
        // console.log('logoutAll');
        // get the user from the request
        const user = req.user;

        // find the user in the database
        const userInDb = await Auth.findOne({ where: { email: user.email } });

        // get the refresh token from the database
        const expiredToken = userInDb.tokens.tokens;

        // put all tokens in the block list
        // console.log(expiredToken);

        expiredToken.forEach(async(token) => {
            const {exp} = await tokenController.verifyToken(token, process.env.JWT_REFRESH_SECRET);
            try {
                await BlockedToken.create({ token:token, tokenExpiry:Date.now() + exp });
            } catch (error) {}
        });

        // Remove all refresh tokens from the database
        userInDb.tokens = { tokens: [] };
        await userInDb.save();
        // Remove refresh token from the cookie
        res.clearCookie('refreshToken');
        res.status(200).json({ msg: 'Logout from all devices' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};

module.exports = logoutAll;