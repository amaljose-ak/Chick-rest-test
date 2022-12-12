
const express = require("express")
const {userReg}=require('../../functions/userValidation')
const fnct=require('../../functions/userFunction')


const router = express.Router()


router.get('/user/register',  (req,res)=>{
    res.send("home page")
})

router.post('/user/Register',async (req,res)=>{
    console.log(req.body);
    

    const {error}=userReg(req.body)
if(error){
 return   res.send(error.details[0].message)
}
    

    const addusers= await fnct.adduser(req.body)
    console.log(addusers);
   return res.json({
        message:addusers
    })



})



module.exports=router

