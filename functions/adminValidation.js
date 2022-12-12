const joi = require('joi')


const adminRegVal = (data) => {
    const value = joi.object({
        name: joi.string().required().min(4).max(15),
        email:joi.string().required().email().min(5).max(21),
        password: joi.string().required().min(4).max(10)
    })
    return value.validate(data)
}





const adminLoginVal = (data) => {
    const value = joi.object({
        email:joi.string().required().email().min(5).max(21),
        password: joi.string().required().min(4).max(10)
    })
    return value.validate(data)
}

const productValidation=(data)=>{
    const value=joi.object({
        name:joi.string().required().min(4).max(140),
        category:joi.string().required().min(4).max(150),
        price:joi.string().required().min(1).max(14)
    })
    return value.validate(data)
}


module.exports.adminRegVal = adminRegVal
module.exports.adminLoginVal = adminLoginVal
module.exports.productValidation = productValidation