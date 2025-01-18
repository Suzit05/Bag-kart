const express = require("express")
const router = express.Router();
const upload = require("../config/multer-config") //multer-config
const productModel = require("../models/product.models")


router.post("/create", upload.single('image'), async (req, res) => { //upload.single("jis naam se file save krna ho")
    try {
        let {
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor, } = req.body

        //upload krke db m dalo, so model create kro
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,

        })
        req.flash("success", "Product created successfully")   //success naam h aur uske baad uska message
        //product bnne k baad wapas admin page pr bhej do 
        res.redirect("/owners/admin")
    }
    catch (err) {
        res.send(err.message)
    }

})


module.exports = router