import express from "express"
import { PORT, MongodbURL } from "./config.js"
import mongoose from "mongoose"
// import { book } from "./models/bookmodels.js"
import bookRoutes from "./routes/bookRoutes.js"
const app = express()


app.use(express.json())
app.get('/', (req, res) => {
    console.log(req);
    return res.status(555).send("Welcome to booksky website");
})

app.use('/books',bookRoutes)
mongoose.connect(MongodbURL)
    .then(() => {
        console.log("connected")
        app.listen(PORT, () => {
            console.log("server is connected")
        })
    })

