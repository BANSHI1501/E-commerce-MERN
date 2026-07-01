require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

async function testConnect(){
  try{
    console.log('Attempting to connect to MongoDB (test)...')
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Test connection successful')
    await mongoose.disconnect()
    process.exit(0)
  }catch(err){
    console.error('Test connection failed:')
    console.error(err && err.message ? err.message : err)
    process.exit(1)
  }
}

if(!uri){
  console.error('MONGODB_URI is not set in .env')
  process.exit(1)
}

testConnect()
