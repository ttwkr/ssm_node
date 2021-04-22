const express = require('express')
const router = express.Router()
const {mailAuth}  = require('../api/login')

router.route('/')
    .post(mailAuth)

module.exports = router
