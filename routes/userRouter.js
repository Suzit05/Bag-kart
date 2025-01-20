const express = require("express")
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/authController")

router.get("/", (req, res) => {
    res.send("welcome to the user list")
})


router.get("/login", (req, res) => {
    let error = req.flash("error") //auth m flash bnaye hai jiska naam error rkhe hai
    res.render("index", { error })
})


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)


module.exports = router