const express = require('express')
const {get, post, delete_writing, detail, put} = require("../api/writings");
const {checkToken} = require('../util/auth')
const router = express.Router()


router.get('/',get)
router.post('/', checkToken, post)
router.get('/:id/', detail)
router.delete('/:id/', delete_writing)
router.put('/:id/', checkToken, put)

module.exports = router
