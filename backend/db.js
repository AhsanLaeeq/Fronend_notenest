// const mongoose= require('mongoose');
// const mongoURI="mongodb://localhost:27017/ina"
// const connectToMongo =async()=>{
//         await mongoose.connect(mongoURI, {
//         // useNewUrlParser: true,
//         // useUnifiedTopology: true 
//     });
//     console.log("mongo Connect")
// }
// module.exports=connectToMongo;       

require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;  // Get MongoDB Atlas URI from .env

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
