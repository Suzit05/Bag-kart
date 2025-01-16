const mongoose = require("mongoose")
const config = require("config") //npm i config

const dbgr = require("debug")
//npm i debug kro, then console.log k jgh dbgr use kr skte ho , 
//" set DEBUG=development:*" in terminal


dbgr("development:mongoose")   //call kiya jaa rha , ("phase: jha se msg jaega")

mongoose.connect(`${config.get("MONGODB_URI")}/bag-kart`)
    .then(function () {
        dbgr("connnected")
    })
    .catch(function (err) {
        dbgr(err)
    })
//    //    //EK baar connect ho gya hai to baki model m ye connect krne ki koi jrurt nhi


module.exports = mongoose.connection;

