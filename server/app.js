//environment
if (process.env.NODE_ENV === "development") require('dotenv').config()

const express = require('express')
const app = express()
const PORT = +process.env.PORT || 3000
const routes = require('./routes')
const cors = require('cors')
const errorHandlers = require('./middlewares/errorHandlers')

//middlewares
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routing
app.use(routes)

//errorHandlers
app.use(errorHandlers)

//listener is on bin http


module.exports = app