const mongoose = require('mongoose')
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String
    },
    profileImageUrl:{
        type:String,
        default:'/images/imagesf.jpeg'
    },
    role:{
        type:String,
        enum:['User','Admin'],
        default:'User'
    }
},{timestamps:true})

userSchema.pre('save', async function(){
    const user = this;
    if(!user.isModified('password')) return ;
    const salt = crypto.randomBytes(16).toString('hex')
    const hashedPassword = crypto 
     .createHash("sha256", salt)
     .update(user.password +salt)
     .digest('hex')
     this.salt = salt;
     this.password = hashedPassword
})

userSchema.static('matchPassword', async function(email,password){
    const user = await this.findOne({email})
    if(!user) return false ;
    const salt = user.salt;
    const userProvideHash = crypto
    .createHash('sha256',salt)
    .update(password+salt)
    .digest('hex')
    return user.password === userProvideHash
})

module.exports = mongoose.model('user', userSchema)