const adminC = require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { findOne } = require('../models/admin')


const Functions = {
    addAdmin: async function (data) {

        const adminExist = await adminC.findOne({
            email:data.email,
        })
        if (adminExist) return "admin exist"

        const salt = await bcrypt.genSalt(10)
        const hashedPswrd = await bcrypt.hash(data.password, salt)

        try {

            const admin = new adminC({
                name: data.name,
                email:data.email,
                password: hashedPswrd

            })
            const savedData = await admin.save()
            console.log(savedData._id);
            console.log(admin);
            return savedData._id
        } catch (e) {
            return "some error occured during saving the user"
        }

    },
    Login: async (data) => {
        const userexist = await adminC.findOne({
            email:data.email,
        })
console.log(userexist);
        if (!userexist) {
            
            return {
                statuscode: 401,
                message: 'No account found',
                success: false,
                token: false
            }
        }

        const isVerified = await bcrypt.compare(data.password, userexist.password)
        if (!isVerified) {
            return {
                statuscode: 401,
                message: 'credentials mismatch',
                success: false,
                token: false
            }
        } else {

            try {
                const tolken = await jwt.sign({ _id: userexist._id, }, process.env.SECRET)
                return{
                    statuscode:201,
                    message:'Login Succcesfull',
                    success:true,
                    token:tolken

                }

                
            } catch (error) {
                console.log(error.toString());


            }  
        }


    },
    checkAdmin: async function(check){
        let doCheck= await adminC.findById(check)
        console.log(doCheck)
    }

}


module.exports = Functions