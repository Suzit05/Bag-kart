const jwt = require("jsonwebtoken");

const generatetoken = (user) => {
    return jwt.sign(
        { email: user.email, id: user._id }, // Payload
        process.env.JWT_KEY,                // Secret key
        { expiresIn: "1h" }                 // Token expiration
    );
};

module.exports = { generatetoken };