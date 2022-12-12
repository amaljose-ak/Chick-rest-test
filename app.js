const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const dbconnection = require('./db-config/config')
const adminRouter = require('./routes/admin/adminRgstr')
const adminLoginrouter=require('./routes/admin/adminLogin')
const userRouters=require('./routes/user/userRgstr')
const userRouterLog=require('./routes/user/userLogin')
const productRouter=require('./routes/admin/product')

// middlewares
app.use(express.json())
app.use(morgan('tiny'))

// API middleware
app.use('/chick-rest/register', adminRouter)
app.use('/chick-rest/login',adminLoginrouter)
app.use('/chick-rest/api',userRouters)
app.use('/chick-rest/api',userRouterLog)
app.use('/chick-rest/api',productRouter)



     
// app.get('/',(req,res)=>{
//     res.send('hello it worked')
// })
 
dbconnection()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`sever connected to ${port}`);
})


         