const express = require('express')
const {get,post} = require("../api/writings");
const router = express.Router()

router.route('/')
    .get(get)
    .post(post)

module.exports = router
