const { urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express")
const app = express()
const port = 4000;
const path = require("path")
const expressSession = require("express-session")
const flash = require("connect-flash") //flash kisi route m msg bhej skte hai aur redirect kisi aur route pr kr 
//skte hai, aur wo message jha redirect kiye hai , wha v rhega

const db = require("./config/mongoose-connection") //connection jo config m bnaye hai

const ownersRouter = require("./routes/ownersRouter")  //routes se require kr do
const usersRouter = require("./routes/userRouter")
const productsRouter = require("./routes/productsRouter")
const index = require("./routes/index")

require("dotenv").config(); //require and call, env file m jo jo h sb ab use kr paege
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())
app.use(flash())


app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}))

app.set("view engine", "ejs")


app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)
app.use("/", index)




app.listen((port), () => {
    console.log(`listening on ${port}🙂😁`)
})