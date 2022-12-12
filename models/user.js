
const mongoose=require('mongoose')

const userShema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:8,
        max:25
    },
    email:{
        type:String,
        required:true,
        min:2,
        max:21
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:10
    }
})

module.exports=mongoose.model('user',userShema)