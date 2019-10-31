const measurementRouter = require('express').Router()
const dbOps = require('../utils/dbutils')



//Get all measurements

measurementRouter.get('/', (request, response) => {
    
  dbOps.getAll().then(data => response.json(data))

})

measurementRouter.post('/', (request, response) => {

    dbOps.addOne(request.body).then(added => response.json(added))

})


module.exports = measurementRouter 