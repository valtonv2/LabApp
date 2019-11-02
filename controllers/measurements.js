const measurementRouter = require('express').Router()
const dbOps = require('../utils/dbutils')



//Get all measurements

measurementRouter.get('/', (request, response) => {
    
  dbOps.getAll().then(data => response.json(data))

})

//Add new measurement

measurementRouter.post('/', (request, response) => {

    dbOps.addOne(request.body).then(added => response.json(added))

})

//Delete a measurement

measurementRouter.delete('/:id', (request, response) => {

  const id = request.params.id
  dbOps.deleteOne(id).then(response.status(204).end())

})

//Update measurement
measurementRouter.put('/:id', (request, response) => {

  const id = request.params.id
  const newMeasurement = request.body

  dbOps.updateOne(id, newMeasurement).then(response.json(newMeasurement))


})


module.exports = measurementRouter 