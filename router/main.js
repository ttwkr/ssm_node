const express = require('express')
const router = express.Router()

// Main Page
router.get('/', (req, res, next) => {
    res.send("This is version 4")
})

module.exports = router
