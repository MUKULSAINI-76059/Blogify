const express = require('express')
const router = express.Router()
const {createUser, login, logout} = require('../controllers/user')
const {verifyUser} = require('../middlewares/user')

router.post('/signup',createUser)
router.post('/login', login)
router.get('/logout',verifyUser, logout)




module.exports = router