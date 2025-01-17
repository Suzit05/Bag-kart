const jwt = require("jsonwebtoken")

const generatetoken = (user) => {
    jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
}

module.exports.generatetoken = generatetoken