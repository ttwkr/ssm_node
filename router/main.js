const express = require('express')
const router = express.Router()

// Main Page
router.get('/', (req, res, next) => {
    res.send("This is version 2")
})

module.exports = router
