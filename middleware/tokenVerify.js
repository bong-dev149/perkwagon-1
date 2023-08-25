const BlockedToken = require('../models/BlockedToken');
const { verifyToken } = require('../reusable_module/tokenController');
const tokenVerify = async (req, res, next) => {
    try {
        //get token from query
        const token = req.query.token;
       // get the purpose of the token verification
        const purpose = req.query.purpose;
        // console.log(purpose);
        let secret;
        switch (purpose) {
            case "emailVerification":
                secret = process.env.JWT_SECRET;
                break;

            case "resetPassword":
                secret = process.env.JWT_SECRET;
                break;

            case "refreshToken":
                secret = process.env.JWT_REFRESH_SECRET;
                break;

            case "logout":
                secret = process.env.JWT_ACCESS_SECRET;
                break;

            case "logoutAll":
                secret = process.env.JWT_ACCESS_SECRET;
                break;
                
            default:
                secret = process.env.JWT_SECRET;
                break;
        }


        if (!token) {
            const Error1 = new Error();
            Error1.type = "tokenError";
            Error1.msg = "No token provided";
            throw Error1;
        }
        //check token is valid or not
        const invalidToken = await BlockedToken.findOne({ where: { token: token} });

        if (invalidToken) {
            const Error2 = new Error();
            Error2.type = "invalidToken";
            Error2.msg = "Invalid/Expired link";
            throw Error2;
        }
        //verify token
        const decoded = await verifyToken(token, secret);
        // console.log(decoded);
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
