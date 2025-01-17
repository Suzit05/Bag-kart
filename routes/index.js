const express = require("express")
const router = express.Router()
const isLoggedIn = require("../middlewares/isLoggedIn")


router.get("/", (req, res) => {
    let error = req.flash("error") //auth m flash bnaye hai jiska naam error rkhe hai
    res.render("index", { error })
});

router.get("/shop", isLoggedIn, (req, res) => { //shop jane se phle middleware (isLoggedin) pr jaega 
    res.render("shop")
})


module.exports = router