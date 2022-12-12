const router = require('express').Router()
const { resourceLimits } = require('worker_threads')
const verify=require('../../functions/middlewares/verifytolken')
const f =require('../../functions/functions')


router.get('/product/list',(req,res)=>{
    res.send('product list')

})
 router.post('/addproduct',verify,(req,res)=>{
    console.log(req.verified._id);
    f.checkAdmin(req.verified._id)

res.send('hella')

 })
 

module.exports = router
