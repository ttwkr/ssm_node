const express = require('express')
const router = express.Router()

// Main Page
router.get('/', (req, res, next) => {
    res.send("This is Main Page")
})

module.exports = router