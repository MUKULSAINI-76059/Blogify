const express = require('express')
const path = require('path')
const dns = require('dns')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const userRoutes = require('./routers/user')
const pageRoutes = require('./routers/page')
const blogRoutes = require('./routers/blog')
const app = express()

require('dotenv').config()
connectDB()
dns.setServers(['8.8.8.8','8.8.4.4'])
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(cookieParser())
app.set('views',path.resolve('./views'))
app.use(express.static(path.resolve("./public")))
app.use('/api', userRoutes) 
app.use('/api/blog', blogRoutes) 
app.use('/test', pageRoutes) 


const port = process.env.PORT
app.listen(port, ()=>{
    console.log('Server connected..')
})