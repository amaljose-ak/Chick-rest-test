const jwt=require('jsonwebtoken')



module.exports=function(req,res,next){

    const token=req.header("Authorization")
    if(!token){

       return res.status(404).json({
            message:"access denied"
        })
    }
    try  {

        const verified=jwt.verify(token,process.env.SECRET)
        console.log(verified);
        req.verified=verified
        next()
    } catch (error) {
        return res.send('invalid token')
        
    }


}