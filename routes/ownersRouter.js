const express = require("express")
const router = express.Router();
const ownerModel = require("../models/owner.models")


router.get("/", (req, res) => {
    res.send("welcome to the ownerlist")

})

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find(); //owner model find kro , hai to aur bnne mt do
        if (owners.length > 0) {
            return res.send(503).send("You dont have permission to create the new owner")
        }
        res.send("You can create a new owner")

        let { fullname, email, password } = req.body
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.send(createdOwner)
        console.log(createdOwner)

    })
}


router.get("/admin", (req, res) => {
    let success = req.flash("success") //success k message ko ek variable m store kr rhe hai
    res.render("createproducts", { success }) //aur success ko ejs m bhej rahe taki use frontend m use kr paye
})




module.exports = router;