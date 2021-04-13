const express = require('express')
const router = express.Router()
const {get,post,member_delete,update} = require('../api/members')

router.route('/')
    .get(get)
    .post(post)
    .put(update)
    .delete(member_delete)

module.exports = router
