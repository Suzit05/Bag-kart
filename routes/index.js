const express = require("express")
const router = express.Router()
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product.models")
const userModel = require("../models/user.models")



router.get("/", (req, res) => {
    let error = req.flash("error") //auth m flash bnaye hai jiska naam error rkhe hai
    res.render("index", { error, loggedin: false })  //loggedin bhej rhe taki header m show on off kr ske
});

router.get("/allproduct", async (req, res) => {
    let products = await productModel.find()
    res.send(products)
})

router.get("/shop", isLoggedIn, async (req, res) => { //shop jane se phle middleware (isLoggedin) pr jaega 
    //shop m sara products dikhao
    try {

        const products = await productModel.find(); // Fetch products from DB
        let success = req.flash("success")
        res.render("shop", { products, success }); // Pass products to the EJS template
    } catch (error) {
        req.flash("error", "Unable to fetch products");
        res.redirect("/");
    }
})

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    console.log(req.params.id)
    user.cart.push(req.params.id)
    await user.save()
    req.flash("success", "Added to the cart")
    res.redirect("/shop")


})


router.get("/cart", isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart") //kind of cart k data ko alg kr rha
    const bill = Number(user.cart[0].price + 20 - (user.cart[0].discount))
    res.render("cart", { user, bill })
})

router.get("/logout", isLoggedIn, (req, res) => {
    res.render("shop")
})



module.exports = router