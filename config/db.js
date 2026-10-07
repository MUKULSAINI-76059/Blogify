const mongoose = require('mongoose')
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected successfully.')
    }catch(err){
        console.log('MongoError : ',err)
    }
}

module.exports= connectDB