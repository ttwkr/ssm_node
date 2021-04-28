const express = require('express')
const router = express.Router()
const {post, comment_delete, get, put} = require('../api/comments')
const {checkToken} = require('../util/auth')

router.post('/',post)
router.delete('/:id/', checkToken, comment_delete)
router.get('/', checkToken, get)

module.exports = router







