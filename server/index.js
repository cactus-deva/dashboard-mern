import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js'
import userRouter from './routes/user.route.js'
import propertyRouter from './routes/property.route.js'


dotenv.config()
const app = express()
app.use(express.json({limit: '50mb'}))
app.use(cors())

app.get("/", (req,res) => {
    res.send("hello API")
})

app.use("/api/v1/users", userRouter)
app.use("/api/v1/properties", propertyRouter)

const startServer = async () => {
    try {
        connectDB(process.env.MongoURL)
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error(error)
    }
}

startServer()
