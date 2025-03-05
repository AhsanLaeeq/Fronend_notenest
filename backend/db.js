const mongoose= require('mongoose');
const mongoURI="mongodb://localhost:27017/ina"
const connectToMongo =async()=>{
        await mongoose.connect(mongoURI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true 
    });
    console.log("mongo Connect")
}
module.exports=connectToMongo;       