
const resetPassword = async (req, res) => {
    try {
        if(!req.error){
            //get data from request query
            const resetToken = req.query.token;

            //send response
            res.status(200).json({ msg: "New password form", token: resetToken })
        }
        else{
            //send response
            res.status(400).json({error:req.error});
        }
    } catch (err) {
        res.status(400).json(err.message)
    }
};

module.exports = resetPassword;