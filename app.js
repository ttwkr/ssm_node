const express = require('express')
const routes = require('./router')
const sequelize = require('./models').sequelize

const app = express()
const port = process.env.PORT||3000

app.use('/',routes)

sequelize.sync()

app.listen(port, async () => {
    await console.log(`${port} waiting server port` )
})

