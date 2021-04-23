const express = require('express')
const router = express.Router()
const {mailAuth, verifyCode}  = require('../api/login')

router.post('/auth/', mailAuth)
router.post('/verify/',verifyCode)

module.exports = router
