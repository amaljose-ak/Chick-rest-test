const adminC = require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { findOne } = require('../models/admin')
const foodModel = require('../models/food')
const { object } = require('joi')
const { brotliCompressSync } = require('zlib')



const Functions = {
    addAdmin: async function (data) {

        const adminExist = await adminC.findOne({
            email: data.email,
        })
        if (adminExist) return "admin exist"

        const salt = await bcrypt.genSalt(10)
        const hashedPswrd = await bcrypt.hash(data.password, salt)

        try {

            const admin = new adminC({
                name: data.name,
                email: data.email,
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
            email: data.email,
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
                return {
                    statuscode: 201,
                    message: 'Login Succcesfull',
                    success: true,
                    token: tolken

                }


            } catch (error) {
                console.log(error.toString());


            }
        }


    },
    checkAdmin: async function (check) {
        let doCheck = await adminC.findById(check)
        if (!doCheck) {
            return {
                message: "No admin privalages"
            }
        }
        return {
            isAdmin: true
        }

    },
    addProduct: async function (product) {
        // check item exist
        const itemExist = await foodModel.findOne({
            name: product.name
        })
        if (itemExist) return{
           message:"item Exist",
           name:null,
           _id:null        }
        // creating food model

        try {
            const food = new foodModel({
                name: product.name,
                category: product.name,
                price: product.price
            })
            console.log(food);
            
            //saving the food model
             const saveItem= await food.save()
            

            //returning success or failure message
            return {
                message:"Product added successfully",
                name:saveItem.name,
                _id:saveItem._id
            }

        } catch (error) {
            console.log(error); 

        } 
 

    },
    updateProduct: async function (data,body){
        var isProduct=false

        const product=await foodModel.findById(data.id)
        console.log(data.id);
        if (product){
            isProduct=true
        }else{
            return {
                message:"no item found"
            }
        }

        if(isProduct===true){
           
            const updateProduct=await foodModel.updateOne({_id:data.id},{
                $set:{name:body.name,category:body.category,price:body.price}
                
            })
            return {
                message:"Product updated"
            }
           
        }
       

    },
    deleteProduct: async function(id){
        const product=await foodModel.deleteOne({_id:id})
        console.log(product); 
        console.log(id);
    }


}


module.exports = Functions 