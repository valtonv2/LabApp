/* eslint-disable linebreak-style */
const measurementRouter = require('express').Router()
const dbOps = require('../utils/dbutils')



//Get all measurements

measurementRouter.get('/', (request, response, next) => {

  dbOps.getAll().then(data => response.json(data)).catch(error => next(error))

})

//Add new measurement

measurementRouter.post('/', (request, response, next) => {

  dbOps.addOne(request.body).then(() => response.json(request.body)).catch(error => next(error))

})

//Delete a measurement

measurementRouter.delete('/:id', (request, response, next) => {

  const id = request.params.id
  dbOps.deleteOne(id).then(response.status(204).end()).catch(error => next(error))

})

//Update measurement
measurementRouter.put('/:id', (request, response, next) => {

  const id = request.params.id
  const newMeasurement = request.body

  dbOps.updateOne(id, newMeasurement).then(() => response.json(request.body)).catch(error => next(error))


})


module.exports = measurementRouter