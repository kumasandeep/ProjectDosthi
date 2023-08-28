const jwt = require("jsonwebtoken")
exports.authUser = (req, res, next) => {
    try {
        let tmp = req.header("Authorization")
        const token = tmp ? tmp.slice(7, tmp.length) : "";
        if (!token) {
            return res.status(400).json({ message: "Invalid Authentifiation" })
        }
        jwt.verify(token, process.env.TOKEN_SCRECT, (err, user) => {
            if (err) {
                return res.status(400).json({ message: "Invalid Authentification" })
            }
            req.user = user
            next();
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}