const mongoose=require("mongoose")
require("dotenv").config()

const connection=mongoose.connect(process.env.mongoURI)
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
});
module.exports={connection}


