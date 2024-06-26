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
const corsOption={
    origin:"*",
    methods:["GET","POST","PATCH","PUT","DELETE"],
    credentials:true
}
app.options("",cors(corsOption))
app.use(cors(corsOption))



//connection
const {connection}=require("./config/connection")

//routes
const { authRoute } = require("./route/authRoute")

app.get("/",(req,res)=>{
    res.send("hello hi")
})

app.use("/user",authRoute)
const PORT=process.env.PORT||5000



app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`app is running on port ${PORT} and db also connected`);
    } catch (error) {
        console.log(error);
    }
})