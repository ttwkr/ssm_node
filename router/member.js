const express = require('express')
const router = express.Router()
const api = require('../api/members')

router.route('/')
    .get(api.get)
    .post((req, res) =>{
        res.send("members post")
    })
    .put((req, res) => {
        res.send("members put")
    })
    .delete((req, res) => {
        res.send("members delete")
    })

module.exports = router