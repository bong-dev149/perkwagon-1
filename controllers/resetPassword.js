const { verifyToken, genToken } = require("../Reusable module/tokenController");
const BlockedToken=require('../models/BlockedToken')

const resetPassword = async (req, res) => {
    try {

        const { token } = req.query;

        if (await BlockedToken.findOne({ where: { token } })) {
            res.status(400).json({ error: "Invalid/Expired link" })
        }
        const user=await verifyToken(token, process.env.PASS_RESET_SECRET)
        const nextToken = await genToken(
            { id: user.id, email: user.email },
            "30m",
            process.env.PASS_RESET_SECRET
        );
        res.status(200).json({ message: "New password form", token:nextToken })
    } catch (err) {
   
        res.status(400).json( err.message )
    }
};

module.exports = resetPassword;