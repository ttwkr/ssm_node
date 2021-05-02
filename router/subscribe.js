const express = require('express')
const router = express.Router()
const {get, delete_subscribe} = require('../api/subscribe')
const {checkToken} = require('../util/auth')

router.delete('/:id/', checkToken, delete_subscribe)
router.get('/', checkToken, get)

module.exports = router







