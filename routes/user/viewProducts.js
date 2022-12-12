const router = require('express').Router()
const { viewProducts } = require('../../functions/userFunction')
const verify = require('../../functions/middlewares/verifytolken')
const user = require('../../functions/userFunction')


//Creating routes for displaying Products
router.get('/view/products', verify, async (req, res) => {
    const userChk = await user.checkUser(req.verified)

    if (userChk.isUser === true) {
        const view = await viewProducts()

        return res.json(view)
    }else{
        return res.json({
            message:"you are not able to see this list",
            
        }).status(404)
    }




})

module.exports = router 