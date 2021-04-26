const express = require('express')
const routes = require('./router')
const bodyParser = require('body-parser')
const session = require("express-session");
const sequelize = require('./models').sequelize

const app = express()
const port = process.env.PORT||3000

app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))
app.use('/',routes)

app.listen(port, async () => {
    await console.log(`${port} waiting server port` )
})

