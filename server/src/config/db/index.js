const mongoose = require('mongoose')
async function connect(){
  
try {

await mongoose.connect(process.env.url_mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("seccesfuly")
} catch (error) {
    console.log(error) 
    
}  
}

module.exports = {connect}
