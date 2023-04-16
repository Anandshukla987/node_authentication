const jwt = require('jsonwebtoken');
const user = require("../model/userSchema");

const Authentication = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        // console.log(token);
        const verifyToken = jwt.verify(token, process.env.secret_Key);

        const rootUser = await user.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!rootUser) {
            throw new Error("User not found");

        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();

    }catch(err){
        res.status(401).send("User Unautherised");
    }
}

module.exports = Authentication;