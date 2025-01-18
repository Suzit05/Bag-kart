//test   ---- test1 ----- test@test.com

const userModel = require("../models/user.models")
const productModel = require("../models/product.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generatetoken } = require("../utils/generatetoken") //utils k andr se laya gya jha token bn rha


//phle userRouter m ye bnaye 👇 , fir yha laa diye
module.exports.registerUser = async (req, res) => {


    //agr fullname, email and password m se kch nhi v daal k post krege ..to v model create
    //ho jaega
    //isse bchne k liye try and catch k use krege

    try {
        let { fullname, email, password } = req.body
        console.log(fullname, email, password)
        //sbse phle check kro ki uska already account to nhi
        let user = await userModel.findOne({ email: email })
        if (user) return res.status(401).send("You already have account, try logging in")

        bcrypt.genSalt(10, (err, salt) => { //password hash kiya ja rha
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
                else {
                    const user = await userModel.create({
                        fullname,
                        email,
                        password: hash,
                    })

                    console.log(user)

                    //token bnao
                    // let token = jwt.sign({ email, id: user._id }, "secretcode"); token ko nya file m bna do utils k andr
                    let token = generatetoken(user)
                    res.cookie("token", token)
                    res.send("user created successfully")
                }

            })
        })

    }
    catch (err) {
        console.log(err.message)
    }



}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body
    try {
        let user = await userModel.findOne({ email: email })
        if (!user) return res.send("Email or password is incorrect");
        bcrypt.compare(password, user.password, async (err, result) => {   //bcrypt.compare( plain password, hash password)
            if (result) {
                let token = generatetoken(user)
                res.cookie("token", token)
                let products = await productModel.find();
                res.render("shop", { products })
            }
        })
        //jb compare ho gya hai aur result true ho
        //to fir token bnao
    }
    catch (err) {

        res.status(500).send("Something went wrong");
    }


}