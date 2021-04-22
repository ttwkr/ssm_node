const express = require('express')
const router = express.Router()

// 전체 url 관리
const main = require('./main')
const members = require('./member')
const writings = require('./writing')
const login = require('./login')

router.use('/main', main)
router.use('/members', members)
router.use('/writings', writings)
router.use('/login', login)

module.exports = router
