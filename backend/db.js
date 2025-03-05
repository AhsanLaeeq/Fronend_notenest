const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI; // Ensure this is correctly set

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true, // No longer needed, but safe to keep
            useUnifiedTopology: true, // No longer needed, but safe to keep
        });
        console.log("✅ Connected to MongoDB successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
