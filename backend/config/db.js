const mongoose = require("mongoose")


async function connectDB(){
    try{
        // Use recommended options and provide better error messages
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected')
    }catch(err){
        console.error('MongoDB connection error:')
        // Log full error for debugging (don't commit credentials to VCS)
        console.error(err && err.message ? err.message : err)
        // Exit process so the failure is visible in logs
        process.exit(1)
    }
}

module.exports = connectDB