const express = require('express')
const router = express.Router()
const {mailAuth, verifyCode, join}  = require('../api/login')

router.post('/auth/', mailAuth)
router.post('/verify/',verifyCode)
router.post('/join/', join)

module.exports = router
