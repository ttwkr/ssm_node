const express = require('express')
const router = express.Router()

// 전체 url 관리
const main = require('./main')
const members = require('./member')
const writings = require('./writing')

router.use('/main', main)
router.use('/members', members)
router.use('/writings', writings)

module.exports = router
