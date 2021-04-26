const express = require('express')
const {get, post} = require("../api/writings");
const {checkToken} = require('../util/auth')
const router = express.Router()


router.get('/',get)
router.post('/', checkToken, post)

module.exports = router
