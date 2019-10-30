const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const measurementRouter = require('./controllers/measurements')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use('/api/measurements', measurementRouter)

module.exports = app