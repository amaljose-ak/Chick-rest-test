const router = require('express').Router()
const { userLog } = require('../../functions/userValidation')
const funct=require('../../functions/userFunction')
const { adminLoginVal } = require('../../functions/validation')


// router.get('/user/login',(req,res)=>{
//     res.send('login page')
// })

router.post('/user/login',async  (req,res)=>{
    const {error}= adminLoginVal(req.body)
    if(error){
        console.log(error.details[0].message);
    return res.json({
        message:error.details[0].message
    }) 
    }

    const loggedin= await funct.LoginUser(req.body)
    return res.json({
        statuscode:loggedin.statuscode,
        message:loggedin.message,
        success:loggedin.success,
        token:loggedin.token

    })
  

})

module.exports=router