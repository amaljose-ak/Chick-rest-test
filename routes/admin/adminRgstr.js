const express = require('express')
const {adminRegVal} = require('../../functions/adminValidation')
const f = require('../../functions/adminFunctions')

const router = express.Router()


// debugging
router.get('/api/admin', (req, res) => {
    res.send('api worked')
})


//Registration for admin

router.post('/api/admin', async (req, res) => {
 
    // validating the entered data

    const { error } = adminRegVal(req.body)

    // if any error faced during validation
    if (error) {
        console.log(error.details[0].message);
        return res.json({
            typeoferror: error.details[0].message

        })

    }
    const savedAdmin = await f.addAdmin(req.body)
    console.log(savedAdmin);
    res.json({
        message: savedAdmin,
    })


})


module.exports = router  