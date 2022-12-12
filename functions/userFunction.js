const userCollction = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const food = require('../models/food')


const userFunction = {
    adduser: async function (userdata) {
        const userExist = await userCollction.findOne({
            email: userdata.email,
        })
        if (userExist) return "user exist"
        console.log(userExist);

        const salt = await bcrypt.genSalt(10)
        const hashedPswrd = await bcrypt.hash(userdata.password, salt)

        try {
            const user = new userCollction({
                name: userdata.name,
                email: userdata.email,
                password: hashedPswrd

            })
            const saveUser = await user.save()
            return {
                user: 'succesfully saved'
            }
        } catch (error) {
            return "error"

        }
    },
    LoginUser: async function (login) {
        // check user exist
        const userExist = await userCollction.findOne({
            email: login.email,
        })
        if (!userExist) {
            return {
                message:"no user found"
        }
    }

        const verified = await bcrypt.compare(login.password, userExist.password)

        if (!verified) {
            return {
                statuscode: 401,
                message: 'credentials mismatch',
                success: false,
                token: false
            }
        } else {
            try {
                const tolken = jwt.sign({ _id: userExist._id }, process.env.SECRET)
                return {
                    statuscode: 201,
                    message: 'Login Succcesfull',
                    success: true,
                    token: tolken
                }
            } catch (error) {
                console.log(error);
            }
        }

    },
    viewProducts: async function () {
        const product = await food.find()
        return product
    },
    checkUser: async function(data){
        // check whether the user exist
        const userExist = await userCollction.findById(data._id)
console.log(userExist);
        //if not user
        if(!userExist){
            return {
                isUser:false
            }
        }

    // if user

if(userExist){

    return {
        isUser:true,


    }
}

    }
}

module.exports = userFunction
