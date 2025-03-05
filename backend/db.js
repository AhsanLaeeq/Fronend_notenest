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


const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const mongoURI = process.env.MONGO_URI; // Use MongoDB URI from Railway

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(" MongoDB Connected Successfully");
    } catch (error) {
        console.error(" MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
