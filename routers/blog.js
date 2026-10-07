const express = require('express')
const router = express.Router()
const {adBlog, getBlog, addComment} = require('../controllers/blog')
const {verifyUser} = require('../middlewares/user')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination:function(req, file,cb){ 
       const uploadPath = path.resolve( `./public/uploads/${req.user._id}`)
        fs.mkdirSync(uploadPath, { recursive: true })
        return cb(null, uploadPath)
    },
    filename:function(req, file,cb){
        const fileName = `${Date.now()}-${file.originalname}`
        return cb(null, fileName)
    },

})
const upload = multer({storage})

router.post('/adBlog', verifyUser, upload.single('coverImage'),adBlog)
router.get('/:_id',verifyUser,getBlog)
router.post('/comment/:_id',verifyUser, addComment)

module.exports = router