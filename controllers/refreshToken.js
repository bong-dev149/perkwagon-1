const tokenController = require('../reusable_module/tokenController');
const { expiresInToMilliseconds } = require('../reusable_module/utils');

const refreshToken = async (req, res) => {
    try {
        const expiresIn = process.env.EXPIRES_IN;

        // Validate the token
        const token = req.body.refreshToken;
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify the token
        const user = await tokenController.verifyToken(token, process.env.JWT_REFRESH_SECRET);
        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Generate new access token
        const accessToken = await tokenController.genToken(
            { id: user.id, email: user.email },
            process.env.JWT_ACCESS_EXPIRES_IN,
            process.env.JWT_ACCESS_SECRET
        );

        // Get the timestamp of the token expiration
        const tokenExpiration = new Date(Date.now() + expiresInToMilliseconds(process.env.JWT_ACCESS_EXPIRES_IN)).toISOString();

        //send response
        res.json({ msg: 'Refresh access token generated', accessToken, tokenExpiration });

    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports = refreshToken