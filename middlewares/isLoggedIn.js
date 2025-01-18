const jwt = require("jsonwebtoken")

const userModel = require("../models/user.models")


module.exports = async (req, res, next) => {
    //middleware bnaya jaa rha 
    //jisse check krege ki user k token available hai ya nhi
    //bina token k entry nhi dege
    if (!req.cookies.token) {
        //no token - so no entry
        req.flash("error", "you need to login first")
        return res.redirect("/")
    }

    try {
        //agr token hai to decode krke check krege
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY); //token aur key compare kr k , email nikalege
        let user = await userModel.findOne({ email: decoded.email }).select("-password"); //-password mtlb password chor kr
        req.user = user;
        next()
    }
    catch (err) {
        req.flash("error", "something went wrong")
        res.redirect("/")
    }

}