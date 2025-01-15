const mongoose = require("mongoose")
const { boolean } = require("webidl-conversions")

mongoose.connect("mongodb://127.0.0.1:27017/bag-kart")   //EK baar connect ho gya hai to baki model m ye connect krne ki koi jrurt nhi

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
})



module.exports = mongoose.model("user", userSchema)