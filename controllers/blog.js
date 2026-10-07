const blogModel = require('../models/blog')
const mongoose = require('mongoose')
const commentModel = require('../models/comment')

async function adBlog(req,res){
    try{
    const {title, body} = req.body;
    const file = req.file;
    if(!title || !body || !file) return res.render('createblog',{error:'All fields are required.'})
    const blog = await blogModel.create({body,title,coverImage:`/uploads/${req.user._id}/${file.filename}`,createdBy:req.user._id})
    return res.redirect('/test/')
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

async function getBlog(req,res){
    try{
        const _id = req.params._id
        if(! _id) return res.render('home', {error:'Please click view.'})
        if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
        message: 'Invalid blog ID'
        });
        }
        const allBlog = await blogModel.findById(_id).populate("createdBy")
        const comments = (await commentModel.find({blogId:_id}).populate("createdBy"))
        comments.sort((a, b) => {
             return new Date(b.createdAt) - new Date(a.createdAt);
       });
        if(!allBlog) return res.status(404).json({message:'Not Found'})
        return res.render('blog',{blog:allBlog, user:req.user.email,comments,message: req.query.message})    
    }catch(err){
        return res.status(500).json({error:err.message})
    }
}

async function addComment(req,res){
    try{
    const {content} = req.body
    const createdBy = req.user._id;
    const commentCreate = await commentModel.create({content,blogId:req.params._id, createdBy})
    return res.redirect(`/api/blog/${req.params._id}?message=Comment%20added%20successfully`);
    }catch(err){
        return res.status(500).json({error:err.message})
    }
    
}

module.exports = {adBlog,getBlog, addComment}