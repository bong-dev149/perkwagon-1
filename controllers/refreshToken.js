const tokenController = require('../Reusable module/tokenController');
const {expiresInToMilliseconds} = require('../Reusable module/utils');
const refreshToken=async (req, res)=>{
    const token = req.body.refreshToken;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const expiresIn = process.env.EXPIRES_IN; 
        const user = await tokenController.verifyToken(token, process.env.JWT_REFRESH_SECRET);

        if(!user){
            return res.status(401).json({ error: 'Invalid token' });
        }
        const acccessToken = await tokenController.genToken(
            { id: user.id, email: user.email },
            expiresIn,
            process.env.JWT_SECRET
        );
        // Get the timestamp of the token expiration
        const tokenExpiration = new Date(Date.now() + expiresInToMilliseconds(expiresIn)).toISOString();

        res.json({ message: 'Refresh access token generated', acccessToken, tokenExpiration });
    } catch (err) {
        res.status(500).json(err.message);
    }
};

module.exports=refreshToken