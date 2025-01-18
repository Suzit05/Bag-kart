const express = require("express")
const router = express.Router()
const isLoggedIn = require("../middlewares/isLoggedIn")
const productModel = require("../models/product.models")



router.get("/", (req, res) => {
    let error = req.flash("error") //auth m flash bnaye hai jiska naam error rkhe hai
    res.render("index", { error })
});

router.get("/allproduct", async (req, res) => {
    let products = await productModel.find()
    res.send(products)
})

router.get("/shop", isLoggedIn, async (req, res) => { //shop jane se phle middleware (isLoggedin) pr jaega 
    //shop m sara products dikhao
    try {
        const products = await productModel.find(); // Fetch products from DB
        res.render("shop", { products }); // Pass products to the EJS template
    } catch (error) {
        req.flash("error", "Unable to fetch products");
        res.redirect("/");
    }
})


module.exports = router