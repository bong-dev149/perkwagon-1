const { off } = require('process');
const BlockedToken = require('../models/BlockedToken');
const { verifyToken } = require('../reusable_module/tokenController');
const { Op } = require('sequelize');
const tokenVerify = async (req, res, next) => {
    try {
        //get token from query
        const token = req.query.token;
        if (!token) {
            const Error1 = new Error("No token provided");
            Error1.type = "tokenError";
            throw Error1;
        }
        //check token is valid or not
        const currentTime = Date.now();
        const validToken = await BlockedToken.findOne({ where: { token: token, tokenExpiry: { [Op.gt]: currentTime } } });
        console.log(validToken);
        if (!validToken) {
            const Error2 = new Error("Invalid/Expired link");
            Error2.type = "InvalidToken";
            throw Error2;
        }
        //verify token
        const decoded = await verifyToken(token, process.env.JWT_SECRET);
        //set user in req
        req.user = decoded;

        //next middleware
        next()
    } catch (error) {
        //set error in req
        req.error = error;
        //next middleware
        next()
    }
};

module.exports = tokenVerify;
