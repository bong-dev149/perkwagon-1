const tokenController = require('../reusable_module/tokenController');
const { expiresInToMilliseconds } = require('../reusable_module/utils');
const BlockedToken = require('../models/BlockedToken');

const refreshToken = async (req, res) => {
    try {
        const expiresIn = process.env.EXPIRES_IN;

        
        // console.log(req.query.refreshToken);
        
        
        // Check if the token is in the block list

        const token = req.query.token;
        // console.log(req.query);
        // Validate the token
        if (!token) {
            return res.status(401).json({ 
                type: 'NoTokenError',
                msg: 'No token provided'
             });
        }
        const blockedToken = await BlockedToken.findOne({ where: { token: token } });
        if (blockedToken) {
            // clear the cookie
            await res.clearCookie('refreshToken');
            // console.log(blockedToken);
            return res.status(401).json({ 
                type: 'invlidTokenError',
                msg: 'Invalid/Expired token'
             });
        }


        // Verify the token
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                type: 'NoUserError', 
                msg: 'No user found'
             });
        }

        // Generate new access token
        const accessToken = await tokenController.genToken(
            { auth_id: user.auth_id, email: user.email },
            process.env.JWT_ACCESS_EXPIRES_IN,
            process.env.JWT_ACCESS_SECRET
        );

        // Get the timestamp of the token expiration
        const tokenExpiration = new Date(Date.now() + expiresInToMilliseconds(process.env.JWT_ACCESS_EXPIRES_IN)).toISOString();

        //send response
        res.json({ msg: 'Refresh access token generated', accessToken, tokenExpiration });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = refreshToken