const router = require('express').Router()
const verify = require('../../functions/middlewares/verifytolken')
const f = require('../../functions/adminFunctions')
const { productValidation } = require('../../functions/adminValidation')



router.get('/product/list', (req, res) => {
  res.send('product list')

})
router.post('/addproduct', verify, async (req, res) => {
  console.log(req.verified._id);
  const verify = await f.checkAdmin(req.verified._id)
  console.log(verify);
  // if admin adding the products
  if (verify.isAdmin === true) {

    // validating the data
    const { error } = await productValidation(req.body)
    if (error) {
      return res.json({
        error: error.details[0].message
      })
    }
    // adding product to the database
    const addedItem = await f.addProduct(req.body)
    console.log(addedItem);

    // sending response

    return res.json({
      message: addedItem.message,
      name: addedItem.name,
      _id: addedItem._id
    })




  }

})

router.put('/update/product/:id/', verify, async (req, res) => {
  const verify = await f.checkAdmin(req.verified._id)
  if (verify.isAdmin === true) {
   try {
      const productUpadate = await f.updateProduct(req.params,req.body)

      return res.json({
        message:productUpadate.message
      })
    }catch(error){
      console.log(error.toString());
    }
  }




  

})


router.delete('/product/delete/:id',verify,async(req,res)=>{


 const verify = await f.checkAdmin(req.verified._id)
  if (verify.isAdmin === true) {
   try {
      const productDelete = await f.deleteProduct(req.params.id)

      return res.json({
        message: "prouct Deleted successfully"
      })
    }catch(error){
      console.log(error.toString());
    }
  }

})

module.exports = router
