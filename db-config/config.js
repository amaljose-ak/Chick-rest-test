// Connecting Database with Mongoose

const mongoose = require('mongoose')


// Connection to database

const dbconnection = async function () {
try{
mongoose.set(`strictQuery`, false)
const db = await mongoose.connect(process.env.DBCONIFG)
console.log('Database Connected Successfully' + db);
}catch (err){
console.log('couldnt connect with database' +err);
}
}

module.exports = dbconnection