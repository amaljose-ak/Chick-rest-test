const mongoose=require('mongoose')


const foodSchema=new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
    category: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
    price: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
  

})
module.exports = mongoose.model('food', foodSchema)