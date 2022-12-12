const verify=require('../../functions/middlewares/verifytolken')
const funct=require('../../functions/userFunction')

const router=require('express').Router()



router.put('/update/user/:id',verify,async(req,res)=>{ 
const checkuser=await funct.checkUser(req.verified)

if(checkuser.isUser===true)
{

     const updateuser=await funct.updateUser(req.params,req.body)

     return res .json({
    message:updateuser.message
})
}
   

     
})


module.exports=router