const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

async function createUser(req, res){
    try{
       const {fullName, email, password, role, profileImageUrl} = req.body
       if (!fullName || !email || !password) return res.status(400).json({message:'Something went wrong.'})
       const isUser = await userModel.findOne({email})
       if(isUser) return res.render('login',{error:'User already registered.'})
       const user = await userModel.create({fullName, email, password, role: role || 'User', profileImageUrl:profileImageUrl || '/images/imagesf.jpeg'}) 
       const token = jwt.sign({email, role, _id:user._id},process.env.SECRET_KEY,{expiresIn:'30m'})
       res.cookie("Token",token,{httpOnly: true,secure: true})
       return res.redirect('/test/')
    }catch(err){
        console.log('createUsr Error : ',err)
        return res.status(500).json({Error : err.message})
    }

} 


async function login(req,res){
    try{
        const { email, password} = req.body
       if ( !email || !password ) return res.render('login',{error:'Something went wrong.'})
       const user = await userModel.findOne({email})
       if(!user) return res.render('signup',{error:'User does not exists.'})
       const isMatched = await userModel.matchPassword(email, password)
       if(!isMatched) return res.render('login',{error:'Invalid email or password'})
        const token = jwt.sign({email, role:user.role, _id:user._id},process.env.SECRET_KEY,{expiresIn: "30m"})
        res.cookie("Token",token,{httpOnly: true,secure: true})
        return res.redirect('/test/')
    }catch(err){
        console.log('Login error',err)
        return res.status(500).json({message:err})
    }
}


async function logout(req, res){
    try{
        res.clearCookie('Token')
        return  res.redirect('/test/login')
    }catch(err){
        return res.status(400).json({message:err})
    }
}






module.exports = {createUser, login, logout}