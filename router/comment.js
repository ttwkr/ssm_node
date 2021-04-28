const express = require('express')
const router = express.Router()
const {post, comment_delete} = require('../api/comments')
const {checkToken} = require('../util/auth')

router.post('/',post)
router.delete('/:id/', checkToken, comment_delete)

module.exports = router







