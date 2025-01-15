const { urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express")
const app = express()
const port = 4000;
const path = require("path")

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

app.set("view engine", "ejs")


app.get("/", (req, res) => {
    res.send(" Welcome to sthe bag cart")
})


app.listen((port), () => {
    console.log(`listening on ${port}🙂😁`)
})