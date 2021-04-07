const express = require('express')
const app = express()
const port = process.env.PORT||3000
const routes = require('./router')

app.use('/',routes)

app.listen(port, async () => {
    await console.log(`${port} waiting server port` )
})

