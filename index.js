// configuration,import
require("dotenv").config()
const express=require("express")
const cookieParser=require("cookie-parser")
const cors=require("cors")

// Initialize Express /
const app=express()


//middleware
app.use(express.json())
app.use(cookieParser())

//cors setup
// const corsOption={
//     origin:"http://localhost:5173/",
//     methods:'GET,HEAD,POST,PUT,PATCH,DELETE',
//     credentials:true
// }
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

//connection
const {connection}=require("./config/connection")

//routes
const { authRoute } = require("./route/authRoute")
app.use("/user",authRoute)
const PORT=process.env.PORT



app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`app is running on port ${PORT} and db also connected`);
    } catch (error) {
        console.log(error);
    }
})