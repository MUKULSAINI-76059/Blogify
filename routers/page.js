const express = require('express')
const router = express.Router()
const {verifyUser} = require('../middlewares/user')
const allBlog = require('../models/blog')

router.get('/signup',(req,res) =>{
    return res.render('signup')
})

router.get('/login',(req,res) =>{
    return res.render('login')
})

router.get('/',verifyUser,async (req,res) =>{
    const allBlogs = await allBlog.find({})
    return res.render('home',{user:  req.user.email,allBlogs})
})

router.get('/adBlog',verifyUser, (req,res)=>{
      return res.render('createblog',{user : req.user.email})
})




module.exports = router 