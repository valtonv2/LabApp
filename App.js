/* eslint-disable linebreak-style */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const measurementRouter = require('./controllers/measurements')
const errorHandler = require('./utils/middleware')
const dbOps = require('./utils/dbutils')

const app = express()

dbOps.ensureDB() //Make sure that database exists

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use('/api/measurements', measurementRouter)
app.use((err, req, res, next) => errorHandler(err, req, res, next))

module.exports = app