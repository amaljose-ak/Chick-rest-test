const joi=require('joi')


const userReg=(userdata)=>{
    const value=joi.object({
        name:joi.string().required().min(2).max(20),
        email:joi.string().required().email().min(5).max(21),
        password:joi.string().required().min(4).max(10)
    })
    return value.validate(userdata)
}


const userLog=(loginData)=>{
    const value=joi.object({
        email:joi.string().required().email().min(5).max(21),
        password:joi.string().required().min(4).max(10)
    })
    return value.validate(loginData)
} 


module.exports. userReg=userReg    
module.exports. userLog=userLog    