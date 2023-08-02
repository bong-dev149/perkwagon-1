const jwt = require("jsonwebtoken");

module.exports = {
    genToken: (data, expiry, SECRET) => {
        return new Promise((resolve, reject) => {
            try {
                const token = jwt.sign(data, SECRET, { expiresIn: expiry });
                resolve(token)
            } catch (err) {
                reject(err)
            }
        })
    },
    verifyToken: (token, SECRET) => {
        return new Promise((resolve, reject) => {
            try {
                resolve(jwt.verify(token, SECRET))
            } catch (err) {
                reject(err)
            }
        });
    },
};
