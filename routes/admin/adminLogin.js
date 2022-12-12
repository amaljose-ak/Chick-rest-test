const router = require('express').Router()
const { adminLoginVal } = require('../../functions/adminValidation')
const  f  = require('../../functions/adminFunctions')

router.get('/api/admin', (req, res) => {
    res.send('admin login')
})

router.post('/api/admin', async (req, res) => {
    const { error } = adminLoginVal(req.body)
    if (error) {
        console.log(error.details[0].message);
        return res.json({
            typeoferror: error.details[0].message

        })
    }
    const loggedin=await f.Login(req.body)
   
return res.json({
    statuscode:loggedin.statuscode,
    message:loggedin.message,
    success:loggedin.success,
    token:loggedin.token

})

   

})

module.exports = router  