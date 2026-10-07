const jwt = require('jsonwebtoken')

async function verifyUser(req,res, next){
    try{
    const token = req.cookies.Token
    if(!token) return res.render('login',{error:'Access Denied, Please login first '});
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
}catch(err){
    if(err.message === 'jwt expired') return res.render('login',{error:'Access Denied, Please login first '})
    return res.status(500).json({error:err.message})
}
}

module.exports= {verifyUser}