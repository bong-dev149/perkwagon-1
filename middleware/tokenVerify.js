const { off } = require('process');
const BlockedToken = require('../models/BlockedToken');
const {verifyToken}=require('../reusable_module/tokenController');
const { Op } = require('sequelize');
const  tokenVerify= async(req, res, next) => {
    try {
        //get token from query
        const token = req.query.token;
        if (!token) {
            throw new Error("No token provided");
        }
        //check token is valid or not
        const currentTime=Date.now();
        const validToken = await BlockedToken.findOne({ where: {token:token, tokenExpiry: { [Op.gt]: currentTime } } });
        console.log(validToken);
        if (!validToken) {
            throw new Error( "Invalid/Expired link")
        }
        //verify token
        const decoded=await verifyToken(token, process.env.JWT_SECRET);
        //set user in req
        req.user=decoded;
        
        //next middleware
        next()
    } catch (error) {
        //set error in req
        req.error=error.message;
        //next middleware
        next()
    }
};

module.exports = tokenVerify;
