const express = require('express')
const router = express.Router()
const {checkToken} = require('../util/auth')
const {get,member_delete,update} = require('../api/members')

router.get('/', checkToken, get)
router.put('/',checkToken, update)
router.delete('/', checkToken, member_delete)


module.exports = router
