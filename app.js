const { urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express")
const app = express()
const port = 4000;
const path = require("path")

const db = require("./config/mongoose-connection") //connection jo config m bnaye hai

const ownersRouter = require("./routes/ownersRouter")  //routes se require kr do
const usersRouter = require("./routes/userRouter")
const productsRouter = require("./routes/productsRouter")

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

app.set("view engine", "ejs")


app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)


app.listen((port), () => {
    console.log(`listening on ${port}🙂😁`)
})